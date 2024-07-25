// src/features/rules/rulesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchProductsList = createAsyncThunk('rules/fetchProductsList', async () => {
  
  const response = await axios.get(`https://dynamicpricing.expertvillagemedia.com/public/api/getproductcompetitor`);

  return response.data.data;  
});


// export const fetchProductsCompetitor = createAsyncThunk('rules/fetchProductsCompetitor', async ({new_url , dynamic_price_product_id}) => {
//     const response = await axios.post('https://dynamicpricing.expertvillagemedia.com/public/api/websitelinkadd', {
//         new_url ,  dynamic_price_product_id
//     });
//     return { data: response.data.data, dynamic_price_product_id };
    
//   });


const productsListSlice = createSlice({
  name: 'productList',
  initialState: {
    products: [],
    copititore:{},
    status: 'idle',
    error: null,
  },
  reducers: {
    // deleteRule: (state, action) => {
    //   const idsToDelete = action.payload;
    //   state.products = state.products.filter(product => !idsToDelete.includes(product.id));
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        
        // state.copititore = action.payload
        // console.log(action.payload.products[competior_product_url])
        // state.competitors = action.payload.products[competitors];
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })  
         
  },
});


// export const { deleteProducts } = productsSlice.actions;

export default productsListSlice.reducer;
