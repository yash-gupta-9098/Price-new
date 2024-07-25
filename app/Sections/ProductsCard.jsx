
import {
  Card,
  Thumbnail,
  Collapsible,
  Grid,
  Button,
  InlineStack,
  Text,
  BlockStack,
  Badge,
  Icon,
  LegacyStack,
  LegacyCard,
  FormLayout,
  TextField,
  InlineError,
  ButtonGroup, 
  Box,
  Bleed,
  Layout,
} from "@shopify/polaris";
import { Paginate } from "../component/Paginate";
import { useCallback, useEffect, useState } from "react";
import {Table} from "../component/Table";
import {
  CaretDownIcon , CaretUpIcon , PlusIcon , DeleteIcon,
  CalendarIcon
} from '@shopify/polaris-icons';
import { Link } from "@remix-run/react";

import {showToastMessage} from "../component/Toast"
import axios from "axios";
import {
  SearchIcon
} from '@shopify/polaris-icons';

import {
  ImageIcon
} from '@shopify/polaris-icons';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../features/rules/productsPageSlice";




let isInvalid = false;
let errorMessage = isInvalid ? "App URL is not a valid url" : "";

export function ProductsCard({currentPage , query , sortSelected}) {

 const dispatch  = useDispatch()

  const productsData  = useSelector(state=> state.productList.products)  
  const status  = useSelector(state=> state.productList.status)
  
  const [productsList, setProductsList] = useState(productsData);
  const [dataTableAccor, setDataTableAccor] = useState(productsList.map(()=>false));
  const [addButtonloading, setaddButtonloading] = useState(false);
  const [addUrlAccor, setAddUrlAccor] = useState(productsList.map(()=>false));
  const [addedUrlValue  , setAddedUrlValue ]= useState([]);
  const [appendTableData  , setAppendTableData ]= useState([]);
  const [sortedvalue  , setsSortedvalue ]= useState([]);
  // const isInvalid = isUrlValid(addedUrlValue);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsList());
    }
    
  }, [status, dispatch]);


  useEffect(()=>{
    const sortedList = sortProducts(productsList , sortSelected )
    setProductsList(sortedList)
  }, [productsData , sortSelected])


console.log("productsList" , productsList )
 

  useEffect(()=>{

    setDataTableAccor(productsList.map((product) => {
      console.log(product.competior_product_url.length, "products");
  
      if (product.competior_product_url.length > 0) {
          return true       
        } else {       
         return false
      }
    }));
    setAddUrlAccor(productsList.map(()=>false))
    console.log(dataTableAccor)
  
  }, [productsList , currentPage]);
 
 
  function handleFilterProducts(query){
    // setFilteredSegments(productList);
    // console.log(query , "filtered");
    const nextFilteredProducts = productsList.filter((product) => {
      return product.product_title
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim());
    }); 
    setProductsList(nextFilteredProducts);
  };


// initial Search Product   
  useEffect(()=>{
    console.log(query , "query ")
    if (query.length >= 2) {
      handleFilterProducts(query);
    }   
    else{        
      const sortedList = sortProducts(productsData , sortSelected )
      console.log(sortedList ,"sortedList")
      setProductsList(sortedList)     
    }  

 },[query])

// initial Sorting product 
 useEffect(()=>{
  const sortedList = sortProducts(productsList , sortSelected )
  setProductsList(sortedList)  
 }, [sortSelected])


//  Sorting DropDown  
  const sortProducts = (productsList, sortSelected) => {
    console.log(sortSelected , "test")
    // const [key, direction] = sortSelected[0].split(" ");
    const sortedPoducts = [...productsList].sort((a, b) => {
    
      if(sortSelected === "ProductNameAlpha"){
          const aValue = a.product_title.toLowerCase();
        const bValue = b.product_title.toLowerCase();
        if (aValue < bValue) return -1;
        if (aValue > bValue) return  1 ;
        return 0;
      }
      else if (sortSelected === "ProductNameReverseAlpha") {
      
        const aValue = a.product_title.toLowerCase();
        const bValue = b.product_title.toLowerCase();
        if (aValue < bValue) return 1;
        if (aValue > bValue) return  -1 ;
        return 0;
      
      }    
    });
    return sortedPoducts;
  };





  
  const handleaAddurl =(index)=>{
    setAddUrlAccor(prev=>{
      const newOpenState = [...prev]
      newOpenState[index] = !newOpenState[index]
      return newOpenState;
    })
  } 
   



  const handleDataTable =(index)=>{    
    setDataTableAccor(prev=>{     
      const newOpenState = [...prev]
      newOpenState[index] = !newOpenState[index]
      return newOpenState;
    })  
  } 



  const handleaddedUrlValue = useCallback(
      (value, index) => {
        setAddedUrlValue((prevState) => {
          const newState = [...prevState];
          newState[index] = value; // Update the value at the specified index
          return newState;
        });
        isUrlValid(value);

      },
      []
  );
  


  const submitdata = (new_url , dynamic_price_product_id) => { 
    setaddButtonloading(true)  
    console.log({dynamic_price_product_id})
    if(new_url){
      setAppendTableData([])
       axios.post('https://dynamicpricing.expertvillagemedia.com/public/api/websitelinkadd', {
        new_url:new_url, 
        dynamic_price_product_id: dynamic_price_product_id
      })
      .then((response) => {
        // dispatch(postData());
        const data = response.data.data
        console.log(data , "response")
      console.log(data)
       
      productsList.map((item)=> {
           if(item.id == dynamic_price_product_id){
            console.log(item , "items")
            console.log(item.competior_product_url , "get competitor ")
              item.competior_product_url.push(response.data.data); 
              // setAppendTableData(response.data.data)           
             }
          })   
          
          
          
        
      
        
        showToastMessage("Url is added" , 2000);   
        setAddedUrlValue("")  
        setaddButtonloading(false) 
       

      }, (error) => {
        console.log(error);
      });
      }
      else{
        
        showToastMessage("Please select one product" , 2000);
      }
  }; 



  const handleaPostProducturl = (index , id )=>{  
  const newtest =  isUrlValid(addedUrlValue[index])

    if(newtest){
      submitdata(newtest , id)
      if(!dataTableAccor[index]){
        handleDataTable(index)
      }     
      handleaddedUrlValue("",index )          
    }  
 }



 useEffect(()=>{

 }, [submitdata])





  return (
    <>
        
      <BlockStack gap="800">

        {/* <Layout>
          <Layout.Section>
        <TextField
              label=""
              type="search"
              value=""
              onChange={handleTextFieldChange}
              prefix={<Icon
                source={SearchIcon}
                tone="base"
              />}
              autoComplete="off"
            />
            </Layout.Section>

            <Layout.Section variant="oneThird">

            </Layout.Section>

        </Layout> */}


        {productsList &&
          productsList.length > 0 &&
          productsList.map((product , index) => (
            
            <Card key={product.id}>
              <BlockStack gap="500"> 
              <Grid
                blockAlign="start"
                columns={{ xs: 1, sm: 5, md: 6, lg: 6, xl: 6 }}
                areas={{
                  xs: ["product", "button"],
                  sm: ["product product product product button button"],
                  md: ["product product product product button button"],
                  lg: ["product product product product  button button"],
                  xl: ["product product product product button button"],
                }}
              >
                <Grid.Cell area="product">
                  <BlockStack>
                    <InlineStack gap="400" wrap={false}>
                      <Box className={
                            product.product_image  ? "pm_widthimage"  :  "pm_noimage"
                          }>
                      {
                        <Thumbnail
                          source={
                            product.product_image  ? product.product_image  : ImageIcon
                          }
                          size="large"
                          alt="Black choker necklace"                          
                          
                        />
                      }
                      </Box>
                      <BlockStack align="start" gap="200">
                        <Text alignment="start" variant="headingMd" as="h6" breakWord>
                          {product.product_title}
                        </Text>
                        <InlineStack gap="200">
                          {product.product_type ? (
                            <Badge tone="info">
                              Type:{product.product_type}
                            </Badge>
                          ) : (
                            ""
                          )}
                          {product.status ? (
                            <Badge tone="success">
                              Status:{product.product_status}
                            </Badge>
                          ) : (
                            ""
                          )}
                        </InlineStack>
                        <InlineStack gap="200">                          
                              <Badge>
                                Product Code:{product.product_sku}
                              </Badge>
                              <Badge>
                                BarCode:{product.product_barcode}
                              </Badge>
                              <Badge>Price:{product.product_price}</Badge>
                            
                        </InlineStack>
                      </BlockStack>
                    </InlineStack>
                  </BlockStack>
                </Grid.Cell>
                <Grid.Cell area="button">
                  <BlockStack style={{justifyContent:"end", gap:"5px"}}>  
                  <Link to={`/app/product/${product.product_id}`}>
                  <Button                            
                        icon={CalendarIcon}
                        >                         
                      </Button>  
                      </Link>            
                  <Button  variant="Primary" icon={PlusIcon} onClick={()=> handleaAddurl(index)}> Add URL</Button>
                  <Button      
                        disabled= { product.competior_product_url.length <=  0  }                        
                        onClick={()=> handleDataTable(index)}
                        icon={dataTableAccor[index] ?  CaretUpIcon : CaretDownIcon}
                        ariaExpanded={open}
                        ariaControls="basic-collapsible"
                        >                         
                      </Button>
                      
                 </BlockStack>
                        

                </Grid.Cell>
              </Grid>
              <Grid className="pm_productCard" blockAlign="start"
                columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>             
                  <Grid.Cell>
                      <Collapsible
                              open={addUrlAccor[index]}
                              id="addUrl-collapsible"
                              transition={{duration: '500ms', timingFunction: 'ease-in-out'}}                  
                              >
                            <LegacyStack wrap={false} alignment="leading" spacing="loose">
                                  <LegacyStack.Item fill>
                                    <FormLayout>
                                      <FormLayout.Group condensed>                                            
                                        <TextField
                                          className={"text-new-wiser"}
                                          type="url"
                                          labelHidden
                                          label="Collection rule content"
                                          error={isInvalid}                                              
                                          id={`role-Url-Content${product.id}`}
                                          value={addedUrlValue[index]}
                                          onChange={(value)=> handleaddedUrlValue(value , index)}                                              
                                        />
                                      </FormLayout.Group>
                                    </FormLayout>
                                    <div style={{marginTop: '4px'}}>
                                      <InlineError message={errorMessage} fieldID={`role-Url-Content${product.id}`} />
                                    </div>
                                    </LegacyStack.Item>
                                      <ButtonGroup>
                                        <Button onClick={()=> handleaAddurl(index)}>Cancel</Button>
                                        <Button onClick={()=> handleaPostProducturl(index , product.id)} value={addedUrlValue[index]} variant="primary"  loading={addButtonloading} >Add</Button>
                                      </ButtonGroup> 
                                  </LegacyStack>
                      </Collapsible>
                  </Grid.Cell>
                  <Grid.Cell>                                  
                    <Collapsible
                    open={dataTableAccor[index]}
                    id="basic-collapsible"
                    transition={{duration: '500ms', timingFunction: 'ease-in-out'}}                  
                    >                  
                    {
                      
                        <Card > 
                            <Bleed marginInline="400" marginBlock="400">
                            <Table dataRow={product.competior_product_url}  dataName={"product"} appendTableData={appendTableData}  loading={addButtonloading}/>
                               {/* <Table dataRow={product.competior_product_url}  dataName={"product"} appendTableData={appendTableData}  loading={addButtonloading}/>                              */}
                            </Bleed>
                          </Card>

                    }
                      
                      
                    </Collapsible>
                  </Grid.Cell>                
              </Grid>
              </BlockStack>
            </Card>
            
          
          ))}

          
      </BlockStack>
    </>
  );
}


const isUrlValid= (content) => { 
  var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (content != "") {
      if (!regexp.test(content)) {
        errorMessage = "App URL is not a valid url"
        isInvalid = true;
        return false;
      } else {
            errorMessage="";
            isInvalid= false;                     
            return content;                
      }
  }
  else {    
    // errorMessage = "App URL is required"
    isInvalid= false
  }
}  



 