import { Page, BlockStack, TextField, Icon, Button, Select } from "@shopify/polaris";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {ProductsCard} from "../Sections/ProductsCard";
// import {fetchSelectedProducts} from "../Slice/dashborad/SelectedProductSlice"
import axios from "axios";
import { SkeletonProductscard } from "../component/Skeleton/SkeletonProductsCard";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchIcon , DeleteIcon
} from '@shopify/polaris-icons';
import { fetchProductsList } from "../features/rules/productsPageSlice";
export default function Products() {
    const dispatch = useDispatch()  
    const [againFetch  , setAgainFetch ] =useState(false)
    const status  = useSelector(state=> state.productList.status)
    const error  = useSelector(state=> state.productList.error)
    // const loading = useSelector(state => state.productSlice.loading);


    // const [ selectedproduct , setSelectedproduct]  = useState([])


    // useEffect(()=>{
    //   setSelectedproduct(products)
    // } , [products])


    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchProductsList());
      }
      
    }, [status, dispatch , againFetch]);
  const [loading , setLoading]= useState(true)
  
  const [currentPage, setCurrentPage] = useState(1);  


  // const fetchProductList = async () => {
  //   try {
  //     const response = await axios.get("https://dynamicpricing.expertvillagemedia.com/public/api/getproductcompetitor");
  //     const data = response.data.data;      
  //     setSelectedproduct(data) 
  //     setLoading(false);
    
  //   } catch (error) {
  //     console.log("Error to fetch all product /api/getproduct" , error);
  //     // console.error(error);
  //   }
  // };




 
  // useEffect(()=>{
  //   fetchProductList();    
  // },[])
 

  
  // useEffect(() => {    
    
  //   setFilteredSegments(products); 
    
  //  }, [products]);
  const [query, setQuery] = useState(""); 


  // const addProductHandle  = async()=>{
  //   const products = await shopify.resourcePicker({
  //     type: "product",
  //     selectionIds: [],
  //     multiple: true,
  //     action: "select",
  //     filter: {
  //       hidden: true,
  //       variants: false,
  //       draft: true,
  //       archived: true,
  //     }    
  //   });

  //   if (products) {

  //     console.log(products);
  //     const selectedId =  products.map((product)=> {
  //         const gId = product.id.split('/').pop();      
  //          return gId
  //      })
  //  console.log(selectedId)
  //      axios.post("https://dynamicpricing.expertvillagemedia.com/public/api/addproduct" , {
  //        product_id : selectedId, 
  //        shop_address : "rukaiya-demo-25.myshopify.com"
  //      }).then(()=>{        
  //       dispatch(fetchProductsList());        
  //      })
   
       
  //    }
  // }
 
const handleTextFieldChange  = (value)=> {setQuery(value)}
const handleSelectChange  = (value)=> {
  setSortSelected(value)
}
const options = [
  {label: 'Product name A–Z', value: 'ProductNameAlpha'},
  {label: 'Product name Z–A', value: 'ProductNameReverseAlpha'},
];


const [sortSelected, setSortSelected] = useState('ProductNameAlpha');
  return (
    <Page
      title="Products"
      primaryAction={
        <>
        <TextField
        label=""
        type="search"
        value={query}
        onChange={handleTextFieldChange}
        prefix={<Icon
          source={SearchIcon}
          tone="base"
        />}
        autoComplete="off"
        // connectedRight={<Button variant="primary" onClick={addProductHandle}>Add Product</Button>}
      />       
      </>

      }
     
      secondaryActions={         
        <Select
      label=""
      options={options}
      onChange={handleSelectChange}
      value={sortSelected}
    />
       }
      
      // filterActions={[
      //   {
      //     content: "Filter by name",
      //     onAction: () => {
      //       // handle filter by name action
      //     }
      //   },
      //   {
      //     content: "Filter by category",
      //     onAction: () => {
      //       // handle filter by category action
      //     }
      //   },
      //   {
      //     content: "Filter by price",
      //     onAction: () => {
      //       // handle filter by price action
      //     }
      //   }
      // ]}
    >
      <BlockStack gap="500" className="pp-AllProducts-page">
        {/* <IndexFilter /> */}

        { status == "loading" ? <>
          <SkeletonProductscard />
        </> :     
        
        <>
        
        <ProductsCard currentPage ={currentPage} query={query} sortSelected={sortSelected} againFetch={againFetch} setQuery={setQuery}/>
        </>
      
      }

        
      </BlockStack>
    </Page>
  );
}