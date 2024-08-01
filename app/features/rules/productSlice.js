// src/features/rules/rulesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchProducts = createAsyncThunk('rules/fetchProducts', async (url = "https://dynamicpricing.expertvillagemedia.com/public/api/getproduct?page=1") => {
  
  const response = await axios.get(url);
  return response.data.data;  
});


export const fetchSelectedProducts = createAsyncThunk('rules/fetchSelectedProducts', async (count) => {
  console.log(count)  
  const response = await axios.get(`https://dynamicpricing.expertvillagemedia.com/public/api/getSelectedProduct`);
  return response.data.data;  
});



// export const deleteProducts = createAsyncThunk('rules/deleteProducts', async (count) => {
//   console.log(count)  
//   const response = await axios.get(`https://dynamicpricing.expertvillagemedia.com/public/api/getproduct?count=${count}`);
//   return response.data.data;  
// });


// export const fetchProductsCompetitor = createAsyncThunk('rules/fetchProductsCompetitor', async ({new_url , dynamic_price_product_id}) => {
//     const response = await axios.post('https://dynamicpricing.expertvillagemedia.com/public/api/websitelinkadd', {
//         new_url ,  dynamic_price_product_id
//     });
//     return { data: response.data.data, dynamic_price_product_id };
    
//   });


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [
      {
        current_page: 1,
        data: [],
        next_page_url: null,
        last_page: 1,
        last_page_url: null,
      }
    ],
    selcetedProducts:[],
    selectedStatus:'idle',
    status: 'idle',
    selectedError:null,
    error: null,
  },
  reducers: {
    deleteRule: (state, action) => {
      const idsToDelete = action.payload;
      state.products = state.products.filter(product => !idsToDelete.includes(product.id));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSelectedProducts.pending, (state) => {
        state.selectedStatus = 'loading';
      })
      .addCase(fetchSelectedProducts.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded';
        state.selcetedProducts = action.payload;
      })
      .addCase(fetchSelectedProducts.rejected, (state, action) => {
        state.selectedStatus = 'failed';
        state.selectedError = action.error.message;
      });
  },
});


export const { deleteProducts } = productsSlice.actions;

export default productsSlice.reducer;
