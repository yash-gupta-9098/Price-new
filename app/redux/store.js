import { configureStore } from '@reduxjs/toolkit'
import rulesSlice from '../features/rules/rulesSlice'
import productsSlice from "../features/rules/productSlice"
import productsListSlice  from  "../features/rules/productsPageSlice"
export const store = configureStore({
  reducer: {
    rules: rulesSlice,
    products: productsSlice,
    productList: productsListSlice
  }
})

