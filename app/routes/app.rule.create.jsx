import React, { useCallback, useEffect, useState } from 'react'
import { BlockStack, Button, Card,  FormLayout, InlineGrid, Layout, Page, Select, TextField , Text, RadioButton, InlineStack, DataTable, Box, InlineError} from '@shopify/polaris'
import { json, Navigate, useNavigate, useParams } from "@remix-run/react";
import SelectCompetitors from '../component/SelectCompetitors';
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData , Form } from '@remix-run/react';
import SmartPriceTable from '../component/SmartPriceTable';
import axios from 'axios';
import {showToastMessage} from "../component/Toast"
let isInvalid = false;
let errorMessage = isInvalid ? "test" : "" ; 
 
export async function loader() {
    let settings= {
        dynamic_price_id:1,
        shop_address:"princess-demo-store.myshopify.com",
        title: "",
        type:"Single rule mode - standard",
        price_type_select:"custom-price",
        price_type: "USD",
        price_add:"1",
        price_status:"higher",
        apply_price_type:"cheapest",
        apply_price_type_equal:"cheapest",
        select_domain_type:"include",
        product_type:"products",
        product_ids:"",        
        competiors_select:"",
        min_level_cost:"cost",
        min_level_type:"add",
        min_level_value:"0",
        min_level_currency:"USD",
        max_level_cost:"cost",
        max_level_type:"add",
        max_level_value:"0",
        max_level_currency:"USD"

    }
    return json(settings)
  } 


  export async function action() {

    return json({message: "settings Updated"})

  }






  export default function NewRule(){
    const { id } = useParams();
    const settings = useLoaderData()
    const [fomState , setFomState] = useState(settings)
    const dispatch = useDispatch() 
    const navigate = useNavigate();   
    const [loading, setLoading] = useState(true);
    // const products = useSelector(state=> state.getdomainandproductSlice.products) 
      // const domainList = useSelector(state=> state.getdomainandproductSlice.domainList) 
      const [domainList, setDomainList] = useState([])
      const [products, setProducts] = useState([])
      const [responseProduct , setResponseProduct] = useState([])
      const handleProductTypeChange = (selected) => {
        setFomState({...fomState, product_type: selected });
      };
      useEffect(() => {
        
          const fetchDomainAndProducts = async () => {
              try {
                  const response = await axios.get('https://dynamicpricing.expertvillagemedia.com/public/api/getdomainandproduct')
                  if (!response) return;
                      
                //   console.log(response)
                  const getDomain = response.data.data.competiors;
                  setDomainList(getDomain)
                  const getProducts = response.data.data.getproducts;
                  setProducts(getProducts)
              } catch (error) {
                console.log(error, 'Error Fetching Products & Domain')
              }
          }
          fetchDomainAndProducts();

        if(id){
            const fetchData = async () => {
                try {
                  const response = await axios.get(`https://dynamicpricing.expertvillagemedia.com/public/api/getrulebyid/${id}`);
                  
                  const data = response.data.data;                  
                  console.log(response.data.getproducts , "getdata")
                  if(response.data.getproducts){
                    setResponseProduct(response.data.getproducts); 
                  }
                                   
                //   console.log(data , "getdata")
                  setFomState(data);
                  setLoading(false);
                } catch (error) {
                  console.error(error);
                }
              };
              fetchData();
        }else{
            setLoading(false);
        }

       
      }, []);


    
    
     
    
    const [error , setError]= useState({})
        
    
    // useEffect(() => {
        
    //       dispatch(fetchgetdomainandproduct());

        
    //   }, [dispatch]);

    //   useEffect(() => {
        
    //     if(!id){
    //         isValueInvalid(fomState); 
    //     }       
    
      
    // }, [fomState]);

    
    const [pageTilte , setPageTilte]= useState("Create A New Rule") // data dynamic lana h 
   
    
    // submit
    async  function handleSubmit(){
        //  const buttonClick=  document.getElementById("create_formButton")
        
        if (Object.keys(error).length > 0){
            return console.log(error)
        }else{        
            if(id){
                console.log(fomState, '99999999999999999999')
                // alert(fomState, '10101001010')
                axios.post(`https://dynamicpricing.expertvillagemedia.com/public/api/updaterule`, fomState)
                .then( res=> {
                    console.log(res.data)
                    if(res.data.status === "success"){
                        const data = res.data.data;
                        // console.log(data.product_type);
                        console.log(res.data.getproducts , "getdata")
                        if(res.data.getproducts){
                          setResponseProduct(res.data.getproducts); 
                        }
                        console.log("success updaterule -1")
                        // showToastMessage("Rule Updated" , 2000); 
                    }
                })
                return;
            }
            console.log(fomState, '33333333333')
            isValueInvalid(fomState); 
            if (!fomState.title) return
            axios.post('https://dynamicpricing.expertvillagemedia.com/public/api/insertrule', fomState )
            .then(async(res) => {
                if(res.data.status === "success"){
                    const ruleId = res.data.data.id


                    console.log("Rule craeted -1")
                    navigate(`/app/rule/edit/${ruleId}`)
                }
            })
        // const data = res
        // console.log(data.PromiseState)
        //     // navigate(-1)
        }
       
         
         
        //  buttonClick.click();         
    }



   // mode 
    const ModeOptions = [
        {label: 'Single rule mode - standard', value: 'single'},
        {label: 'Single rule mode', value: 'multiple'} ,      
      ];
          

    //   const handleChange = useCallback(
    //     (_, newValue) =>{           
    //       setFomState({...fomState, price_type_select: newValue})
    //     } , 
    //     [],   
    // );


    // I Would like to be position 

    const priceTypeOptions = [
        {label: 'USD', value: 'USD'},
        {label: '%', value: 'percentage'} ,      
      ];
    const priceStatusOptions = [
        {label: 'Higher', value: 'higher'},
        {label: 'lower', value: 'lower'} ,      
      ];
    const priceEqualOptions = [
        {label: 'The Cheapest', value: 'cheapest'},
        {label: 'The Average', value: 'average'} ,      
        {label: 'The Highest', value: 'highest'} ,      
      ];



// Competitors


const domaiTypeOptions = [
    {label: 'Include', value: 'include'},
    {label: 'Exclude', value: 'exclude'} ,      
  ];
const selectProductTypeOptions = [
    {label: 'Product', value: 'product'},
    {label: 'Collection', value: 'collection'} ,      
  ];

const minLevelOption = [
    // {label: 'cost + Additional cost', value: 'cost_additional_cost'} ,      
    {label: 'Cost', value: 'cost'},
  ];
const maxLevelOption = [
    // {label: 'cost + Additional cost', value: 'cost_additional_cost'} ,      
    {label: 'Compare at price', value: 'compare_at_price'},
    {label: 'Cost', value: 'cost'},
  ];

const pluseMiniusOption= [
    {label: '+  ', value: 'add'},
    {label: '-  ', value: 'sub'},   
  ];








//   function isValueInvalid(content) {
//     if (!content) {
//         errorMessage = "Please enter the rule name"
//         isInvalid = true;
//         return false;
//     }
// else{
    
//     errorMessage = ""
//     isInvalid= false
    
// }
//   } 






const  isValueInvalid = (obj) => {
  
    const errors = {};
    for (const [key, value] of Object.entries(obj)) {  
        console.log(key , value)        
        if ( key == "title" && !value ) {
            errors[key] = `${key} cannot be empty`;
      }

      
   }  
    
    
    return setError(errors);
} 





const numberChangeHandle = ( key , e)=>{

    const inputValue = e
  const regex = /^[0-9]+$/;
  if (!regex.test(inputValue)) {
    e = inputValue.replace(/[^0-9]/g, '');
  }
  setFomState({...fomState , [key]: e })
}
  
if (loading) {
    return <div>Loading...</div>;
  }





  return (
    <Page
     backAction={{content: 'Products', onAction:()=>{navigate(-1)}}}
     title={pageTilte}
     primaryAction={{content: 'Save', disabled:(Object.keys(error).length > 0) ? true : false , onAction: handleSubmit }}   
     >
        <BlockStack gap={{ xs: "800", sm: "400" }}>
                <Form  onSubmit={handleSubmit} >
                <Card>
                        <BlockStack gap={{ xs: "800", sm: "400" }}>
                        
                            <Card>
                                <InlineGrid columns={{ xs: "1fr", md: "1fr 1fr" }} gap="400">
                                    <BlockStack gap="100">                         
                                        <Text as="p" fontWeight="bold" paddingBlockEnd={300}>
                                            Rule Name
                                        </Text>                                                    
                                        <TextField
                                        name='title'
                                        value={fomState.title ? fomState.title : ""}                            
                                        type="text"
                                        onChange={(e)=>{setFomState({...fomState , title: e }) ; isValueInvalid(fomState)}}
                                        autoComplete="off"
                                        id="role-title"
                                        className={"text-text"} 
                                        error={error.title ?  error.title : false}
                                        /> 
                                        {/* <InlineError message={error.title} fieldID={`role-title`} /> */}
                                    
                                    </BlockStack> 
                                    <BlockStack gap="100">   
                                        <Text as="p" fontWeight="bold" paddingBlockEnd={300}>
                                            Mode
                                        </Text> 
                                    <Select
                                    name='Mode'                            
                                    options={ModeOptions}               
                                    value={fomState.type}
                                    onChange={(e)=>{setFomState({...fomState , type: e })}}
                                    />  
                                    </BlockStack> 
                                </InlineGrid>
                            </Card>
                            <Card> 
                                <Box paddingBlockEnd={300}>         
                                <Text as="p" fontWeight="bold" >
                                    I would like to be position
                                </Text>
                                </Box>  
                                <InlineGrid columns={{ xs: "1fr", md: "1fr" }} gap="200" blockAlign="start">
                                <FormLayout.Group>
                                    <InlineStack gap="200" blockAlign="center"  align={"space-between"}>                                        
                                        <TextField                                                                
                                            type="text"
                                            pattern="[0-9]*"
                                            step={1}
                                            min={0}
                                            max={100}
                                            value={fomState.price_add}
                                            autoComplete="off"
                                            suffix={fomState.price_type == "percentage" ? "%" : fomState.price_type}  
                                            name="price_add"
                                            onChange={(e)=>{numberChangeHandle("price_add" , e)}}                       
                                            connectedLeft={
                                                <RadioButton                                    
                                                label=""
                                                id="custom-price"
                                                value="custom-price"
                                                name="price_type_select"
                                                checked={ fomState.price_type_select=== 'custom-price'}                                   
                                                onChange={(_ ,newValue)=>{setFomState({...fomState , price_type_select: newValue})}}                                 
                                            
                                            />
                                            }                        
                                            connectedRight={
                                                <InlineStack gap="200" blockAlign="center">
                                                <Select
                                                name="price_type"
                                                options={priceTypeOptions}               
                                                value={fomState.price_type}
                                                onChange={(selected)=>{setFomState({...fomState , price_type: selected})}}
                                                />
                                                <Text as="p" fontWeight="bold">
                                                Than
                                            </Text>
                                            <Select    
                                                name='apply_price_type'                        
                                                options={priceStatusOptions}               
                                                value={fomState.apply_price_type}
                                                onChange={(selected)=>{setFomState({...fomState , apply_price_type: selected})}}
                                                /> 
                                                </InlineStack>
                                            }
                                            />                           
                                                
                                    </InlineStack>                      
                                    <InlineStack gap="200" blockAlign="center">                            
                                        <RadioButton
                                                    label=""
                                                    id="equal"
                                                    value="equal"
                                                    name="price_type_select"
                                                    checked={fomState.price_type_select === 'equal'}                                       
                                                    onChange={( _ , newValue)=>{setFomState({...fomState , price_type_select: newValue})}}   
                                                />
                                                <Text as="p" fontWeight="bold">
                                                    Equal to
                                                </Text>
                                                <Select 
                                                    name="apply_price_type_equal"                           
                                                    options={priceEqualOptions}               
                                                    value={fomState.apply_price_type_equal} 
                                                    onChange={(selected)=>{setFomState({...fomState , apply_price_type_equal: selected})}}                                                                  
                                                />                 

                                    </InlineStack>
                                </FormLayout.Group>
                                </InlineGrid>
                            </Card>
                            <Card>   
                                <Box paddingBlockEnd={300}>                    
                                    <Text as="p" fontWeight="bold" >
                                            Competitors
                                    </Text>
                                </Box>
                                
                                <FormLayout.Group>
                                <InlineGrid gap="400" columns={2}>
                                <Select 
                                    name="select_domain_type"                           
                                    options={domaiTypeOptions}               
                                    value={fomState.select_domain_type}
                                    onChange={(selected)=>{setFomState({...fomState , select_domain_type: selected})}}                               
                                />
                                      {
                                          domainList.length > 0 &&
                                          <SelectCompetitors setFomState={setFomState} fomState={fomState} name="competiors_select" type="domainList" domainList={domainList}>
                                            {/* <InlineError message={error.competiors_select}/> */}
                                          </SelectCompetitors>
                                      }
                                </InlineGrid>
                                </FormLayout.Group>
                            </Card>
                            <Card>   
                                <Box paddingBlockEnd={300}>                    
                                    <Text as="p" fontWeight="bold" >
                                        Apply to
                                    </Text>
                                </Box>
                                <FormLayout.Group>
                                <InlineGrid gap="400" columns={2}>
                                <Select 
                                    name="product_type"                           
                                    options={selectProductTypeOptions}               
                                    value={fomState.product_type}
                                    onChange={handleProductTypeChange}                          
                                />
                                      {
                                          products.length > 0 && 
                                          <SelectCompetitors setFomState={setFomState} fomState={fomState} name="product_ids" type="product" products={products} >
                                            {/* <InlineError message={error.product_ids}  /> */}
                                              </SelectCompetitors>
                                }
                                </InlineGrid>
                                </FormLayout.Group>
                            </Card>
                            <Card> 
                                <Box paddingBlockEnd={300}>              
                                    <Text as="p" fontWeight="bold" >
                                        As Long As I Respect
                                    </Text>
                                </Box>
                                
                                    <FormLayout.Group>
                                    
                                        <TextField
                                                label="Min Level As"
                                                name="min_level_value"
                                                type="text"
                                                pattern="[0-9]*"
                                                value={fomState.min_level_value}
                                                autoComplete="off"
                                                step={1}
                                                min={0}
                                                max={100}
                                                onChange={(e)=>{numberChangeHandle("min_level_value" ,e)}}
                                                suffix={fomState.min_level_currency == "percentage" ? "%" : fomState.min_level_currency}                        
                                                connectedLeft={
                                                    <InlineStack gap="200" blockAlign="center">
                                                    <Select  
                                                    name="min_level_cost"                          
                                                    options={minLevelOption}               
                                                    value={fomState.min_level_cost}
                                                    onChange={(e)=>{setFomState({...fomState , min_level_cost: e })}}
                                                    />   
                                                    <Select   
                                                    name="min_level_type"                         
                                                    options={pluseMiniusOption}               
                                                    value={fomState.min_level_type}
                                                    onChange={(e)=>{setFomState({...fomState , min_level_type: e })}}
                                                    />  
                                                    </InlineStack>                      
                                                
                                                }                        
                                                connectedRight={                            
                                                    <Select
                                                    name="min_level_currency" 
                                                    options={priceTypeOptions}               
                                                    value={fomState.min_level_currency}
                                                    onChange={(e)=>{setFomState({...fomState , min_level_currency: e })}}
                                                    />    
                                                }
                                                />
                                        <TextField
                                                type="text"
                                                pattern="[0-9]*"
                                                label="Max Level As"                                       
                                                value={fomState.max_level_value}
                                                name="max_level_value" 
                                                autoComplete="off"
                                                step={1}
                                                min={0}
                                                max={100}
                                                onChange={(e)=>{numberChangeHandle("max_level_value" , e)}}  
                                                suffix={fomState.max_level_currency == "percentage" ? "%" : fomState.max_level_currency}                        
                                                connectedLeft={
                                                    <InlineStack gap="200" blockAlign="center">
                                                    <Select   
                                                    name="max_level_cost"                          
                                                    options={maxLevelOption}               
                                                    value={fomState.max_level_cost}
                                                    onChange={(e)=>{setFomState({...fomState , max_level_cost: e })}}
                                                    />   
                                                    <Select 
                                                    name="max_level_type"                            
                                                    options={pluseMiniusOption}               
                                                    value={fomState.max_level_type}
                                                    onChange={(e)=>{setFomState({...fomState , max_level_type: e })}}
                                                    />  
                                                    </InlineStack>                      
                                                
                                                }                        
                                                connectedRight={                            
                                                    <Select
                                                    options={priceTypeOptions} 
                                                    name="max_level_currency"               
                                                    value={fomState.max_level_currency}
                                                    onChange={(e)=>{setFomState({...fomState , max_level_currency: e })}}
                                                    />    
                                                }
                                                />
                                                
                                    </FormLayout.Group>
                                
                            </Card>                     
                        
                            <InlineStack wrap={false} >
                                <Button id="create_formButton" variant='primary' onClick={handleSubmit} disabled= { Object.keys(error).length > 0 ? true : false}>Submit</Button>
                            </InlineStack>
                        </BlockStack>          
                        </Card>
                    
                </Form>
                {/*  datatable fro selected Product */}
                <BlockStack gap={{ xs: "800", sm: "400" }}>
                <Text variant="headingMd" as="h5">
                Smart Price Live View
                </Text>
                <SmartPriceTable  responseProduct={responseProduct}  setResponseProduct={setResponseProduct} loading={loading}/>  
                </BlockStack>
        </BlockStack>       
    
    </Page>
  )
}

