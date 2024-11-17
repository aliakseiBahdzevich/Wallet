import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CategoriesState {
  categories: Array<{ name: string, sum: number }>
}

const initialState: CategoriesState = {
  categories: [
    {name: 'Продукты', sum: 0}, 
    {name: 'Транспорт', sum: 0},
    {name: 'Жилищные услуги', sum: 0},
    {name: 'Медицина', sum: 0},
    {name: 'Бытовая техника', sum: 0},
    {name: 'Одежда', sum: 0},
    {name: 'Развлечения', sum: 0},
    {name: 'Алкоголь, сигареты', sum: 0},
  ]
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<{name: string, sum: number}>) => {
      state.categories.push(action.payload)
    },
    changeNameCategory: (state, action: PayloadAction<{currentName: string, sum: number, newName: string}>) => {
        const index = state.categories.findIndex(item => item.name === action.payload.currentName)
        index !== -1 && (state.categories[index].name = action.payload.newName)
    },
    deleteCategory: (state, action: PayloadAction<{currentName: string}>) => {
      const newCategories = state.categories.filter(item => item.name !== action.payload.currentName)
      state.categories = newCategories
    },
    addSumCategory: (state, action: PayloadAction<{name: string, sum: number}>) => {
      const index = state.categories.findIndex(item => item.name === action.payload.name)
      index !== -1 && (state.categories[index].sum += action.payload.sum)
    },
  },
})

// Action creators are generated for each case reducer function
export const {addCategory, changeNameCategory, deleteCategory, addSumCategory} = categoriesSlice.actions

export default categoriesSlice.reducer