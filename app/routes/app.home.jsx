import axios from "axios";
// import { useDispatch , useSelector  } from 'react-redux';
// import { fetchProducts, postData } from '~/Slice/dashborad/productSlice';
import { Form, useNavigate } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { Page } from '@shopify/polaris';
import {showToastMessage} from '../component/Toast';
import { Drop } from '../component/drop';
export default function Index() {
  // const dispatch = useDispatch()   
  const Navigate  = useNavigate()
  const [productList , setProductList]= useState([])
  const [selctedProducts , setSelctedProducts]= useState([])
  const [loading , setLoading]= useState(true)
  const [buttonLoading , setButtonLoading]= useState(false)
  // const selctedProducts = useSelector(state=> state.productSlice.products)
  // const productList = useSelector(state=> state.productSlice.productList)
  // const loading = useSelector(state => state.productSlice.loading);  
  // const newProducts = useSelector(state=> state.productSlice.newselectedProducts) 
  
  // useEffect(()=>{
  //   dispatch(fetchProducts())    
  // }, [])


  // const fetchProductList = useMemo(() => async () => {
  //   try {
  //     const response = await axios.get("https://dynamicpricing.expertvillagemedia.com/public/api/getproduct?count=20");
  //     const data = response.data;
  //     console.log(data.data.getproducts.data);
         
  //   } catch (error) {
  //     console.log("Error to fetch all product /api/getproduct" , error);
  //     // console.error(error);
  //   }
  // }, []);



 


  
  // useEffect(()=>{
   
  //   fetchProductList();  


  // },[fetchProductList])




  const [SubmitButton , setSubmitButton] = useState(true)
  const [newProducts , setNewProducts] = useState([])
  useEffect(()=>{
   
    if(newProducts.length > 0){
      setSubmitButton(false)
    }else{
      setSubmitButton(true)
    }
  }, [newProducts])
  async function selectProduct() {
    const products = await window.shopify.resourcePicker({
      type: "product",
      multiple: true,
      action: "select",
    });

    if (products) {
      const { images, id, variants, title, handle } = products[0];

      setFormState({
        ...formState,
        productId: id,
        productVariantId: variants[0].id,
        productTitle: title,
        productHandle: handle,
        productAlt: images[0]?.altText,
        productImage: images[0]?.originalSrc,
      });
    }
  }
  const submitdata = async () => { 

    setButtonLoading(true) 
    selectProduct()
    // if(newProducts.length !== 0){
    //   await axios.post('https://dynamicpricing.expertvillagemedia.com/public/api/addproduct', {
    //   product_id:newProducts
    //   }
    //   )
    //   .then(async (response) => {
    //     console.log(response);   
    //     setButtonLoading(false);   
    //     showToastMessage("Product is added" , 2000);             
    //     setTimeout(() => {
    //       Navigate("products");
    //     }, 2000);

    //   }, (error) => {
    //     console.log(error);
    //     setButtonLoading(false)
    //   });
    //   }
    //   else{        
    //     showToastMessage("Please select one product" , 2000);
    //   }
  };


  return (
    <div className='dp-dashbord-page page-wrapper'>  
      <Page title="DashBoard" >
        <Form >
          <Drop newProducts={newProducts} setNewProducts={setNewProducts} setSelctedProducts={setSelctedProducts}  selctedProducts={selctedProducts} productList={productList} loading={loading}/>       
        </Form>
      </Page>      
    </div>
  );
}