import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/categoriesSlice'
import budgetReducer from '../features/budgetSlice'


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    budget: budgetReducer, 
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch