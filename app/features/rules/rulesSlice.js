// src/features/rules/rulesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchRules = createAsyncThunk('rules/fetchRules', async () => {
  const response = await axios.get('https://dynamicpricing.expertvillagemedia.com/public/api/getrule' );
  return response.data.data;  
});


export const deleteRules = createAsyncThunk('rules/deleteRules', async () => {
  const response = await axios.post('https://dynamicpricing.expertvillagemedia.com/public/api/getrule' );
  return response.data.data;  
});

const rulesSlice = createSlice({
  name: 'rules',
  initialState: {
    rules: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    deleteRule: (state, action) => {
      const idsToDelete = action.payload;
      state.rules = state.rules.filter(rule => !idsToDelete.includes(rule.id));
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRules.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rules = action.payload;
      })
      .addCase(fetchRules.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })      
  },
});


export const { deleteRule } = rulesSlice.actions;

export default rulesSlice.reducer;
