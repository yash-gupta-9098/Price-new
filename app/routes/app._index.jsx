


import { useAppBridge } from "@shopify/app-bridge-react";
import {BlockStack, Button, Card, EmptyState, Icon, Layout, Page, Text, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import {
  SearchIcon , PlusIcon
} from '@shopify/polaris-icons';
import apiRequest from "../utils/api";
import emptyImage from "../../public/images/emptyProductState.png"
import DashBoard from "../Sections/DashBord";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts, fetchSelectedProducts} from "../features/rules/productSlice";

export default  function Home (){


  const selctedProductList  = useSelector((state) => state.products.selcetedProducts);
  console.log(selctedProductList , "ghsghcjgjh")
  const selectedStatus  = useSelector((state) => state.products.selectedStatus);
  console.log(selectedStatus)
  const status  = useSelector((state) => state.products.status);
  const dispatch = useDispatch()   


  useEffect(() => {
    // if (status === 'idle') {       
    //   dispatch(fetchProducts(10));
    // }

    if( selectedStatus === 'idle'){
      dispatch(fetchSelectedProducts());
    }
    console.log("test")
    
  }, [status, dispatch]); 


  const [selected_product , setSelected_product] = useState([])


console.log(selctedProductList  , "selctedProductList ");



  // useEffect(()=>{
  // ( async()=>{
  //   try {

  //     const result = await apiRequest('/getproduct?selected_product=true');
  //     const data = result.data;
  //     console.log(data)
  //   } catch (error) {

  //     console.log(error)
      
  //   }
  // }


  // )()
  // },[])



  const shopify = useAppBridge();  
  const handleBrowseProduct = useCallback(() => {     
      selectProduct(); 
   });
  
async function selectProduct() {
  const productsResource = await shopify.resourcePicker({
    type: "product",
    selectionIds: selctedProductList,
    multiple: true,
    action: "select",
    filter: {
      hidden: true,
      variants: false,
      draft: true,
      archived: true,
    }    
  });

  
 
  

  //  console.log(selcetdValue);
   const selectedId =  productsResource.map((product)=> {
    console.log("run")
       const gId = product.id.split('/').pop();      
        return gId
    })
      console.log(selectedId)
    axios.post("https://dynamicpricing.expertvillagemedia.com/public/api/addproduct" , {
      product_id : selectedId, 
      shop_address : "rukaiya-demo-25.myshopify.com"
    })    
  
}
    const browserButton = (
        <Button icon={PlusIcon} onClick={handleBrowseProduct} >
          Add Product
        </Button>
      );
    
    
    
  
    const handleTextFieldChange = useCallback(
      (value) => {      
       selectProduct(); 
            
      },[]);   

   return (
    <Page title="Home page" >
        <Layout sectioned>        
          {(
            selctedProductList && selctedProductList.length > 0 && selctedProductList != "" ) ? (<DashBoard handleTextFieldChange={handleTextFieldChange} handleBrowseProduct ={handleBrowseProduct}/>) : (
              <Card> 
              <EmptyState
                heading="Manage your inventory transfers"
                action={ {
                  content: 'Add Products', icon: PlusIcon,
                  onAction: ()=>{handleBrowseProduct()},            
                }}                
                image= "https://cdn.shopify.com/s/files/1/0622/1601/1965/files/emptyProductState_bb450741-2812-458d-b88d-799174333c8e.png?v=1720873673"
              >
                <p>Track and receive your incoming inventory from suppliers.</p>
              </EmptyState> 
              </Card>             
            )}
          
        </Layout>
    </Page>
)



}



  
   
  

{/* <Modal id="Browse-products" onHide={() => setTextFieldValue("")}>
            {showlistBox ? <h2>listbox</h2>: <h2>bySearch</h2> }
            <TitleBar title="Add products">
              <button variant="primary">Add Products</button>
              <button onClick={() => shopify.modal.hide('Browse-products')}>Cancel</button>
            </TitleBar>
          </Modal> */}


// import axios from "axios";
// // import { useDispatch , useSelector  } from 'react-redux';
// // import { fetchProducts, postData } from '~/Slice/dashborad/productSlice';
// import { Form, useNavigate } from "@remix-run/react";
// import { useEffect, useMemo, useState } from "react";
// import { Page } from '@shopify/polaris';
// import {showToastMessage} from '../component/Toast';
// import { Drop } from '../component/drop';
// export default function Index() {
//   // const dispatch = useDispatch()   
//   const Navigate  = useNavigate()
//   const [productList , setProductList]= useState([])
//   const [selctedProducts , setSelctedProducts]= useState([])
//   const [loading , setLoading]= useState(true)
//   const [buttonLoading , setButtonLoading]= useState(false)
//   // const selctedProducts = useSelector(state=> state.productSlice.products)
//   // const productList = useSelector(state=> state.productSlice.productList)
//   // const loading = useSelector(state => state.productSlice.loading);  
//   // const newProducts = useSelector(state=> state.productSlice.newselectedProducts) 
  
//   // useEffect(()=>{
//   //   dispatch(fetchProducts())    
//   // }, [])


//   const fetchProductList = useMemo(() => async () => {
//     try {
//       const response = await axios.get("https://dynamicpricing.expertvillagemedia.com/public/api/getproduct");
//       const data = response.data;
//       setLoading(false)
//       setProductList(data.data.products)
//       console.log(data.products)
//       setSelctedProducts(data.products)
//      console.log(data)
//     } catch (error) {
//       console.log("Error to fetch all product /api/getproduct" , error);
//       // console.error(error);
//     }
//   }, []);



 


  
//   useEffect(()=>{
   
//     fetchProductList();  


//   },[fetchProductList])




//   const [SubmitButton , setSubmitButton] = useState(true)
//   const [newProducts , setNewProducts] = useState([])
//   useEffect(()=>{
   
//     if(newProducts.length > 0){
//       setSubmitButton(false)
//     }else{
//       setSubmitButton(true)
//     }
//   }, [newProducts])
//   async function selectProduct() {
//     const products = await window.shopify.resourcePicker({
//       type: "product",
//       multiple: true,
//       action: "select",
//     });

//     if (products) {
//       const { images, id, variants, title, handle } = products[0];

//       setFormState({
//         ...formState,
//         productId: id,
//         productVariantId: variants[0].id,
//         productTitle: title,
//         productHandle: handle,
//         productAlt: images[0]?.altText,
//         productImage: images[0]?.originalSrc,
//       });
//     }
//   }
//   const submitdata = async () => { 

//     setButtonLoading(true) 
//     selectProduct()
//     // if(newProducts.length !== 0){
//     //   await axios.post('https://dynamicpricing.expertvillagemedia.com/public/api/addproduct', {
//     //   product_id:newProducts
//     //   }
//     //   )
//     //   .then(async (response) => {
//     //     console.log(response);   
//     //     setButtonLoading(false);   
//     //     showToastMessage("Product is added" , 2000);             
//     //     setTimeout(() => {
//     //       Navigate("products");
//     //     }, 2000);

//     //   }, (error) => {
//     //     console.log(error);
//     //     setButtonLoading(false)
//     //   });
//     //   }
//     //   else{        
//     //     showToastMessage("Please select one product" , 2000);
//     //   }
//   };


//   return (
//     <div className='dp-dashbord-page page-wrapper'>  
//       <Page title="DashBoard" primaryAction={{content: 'Submit', disabled: SubmitButton, loading: buttonLoading , onAction: () => submitdata()}}>
//         <Form >
//           <Drop newProducts={newProducts} setNewProducts={setNewProducts} setSelctedProducts={setSelctedProducts}  selctedProducts={selctedProducts} productList={productList} loading={loading}/>       
//         </Form>
//       </Page>      
//     </div>
//   );
// }