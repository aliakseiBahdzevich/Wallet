import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface DailyRecord {
  income: number;
  expenses: number;
}

export interface BudgetState {
  balance: number;
  dailyRecords: {[date: string]: DailyRecord}
  currency: {code: string, symbol: string, name: string}
}

const initialState: BudgetState = {
  balance: 0,
  dailyRecords: {},
  currency: {code: 'USD', symbol: '$', name: 'Доллар США'}
}

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<{income: number, date: string}>) => {
      if (!state.dailyRecords[action.payload.date]) {
        state.dailyRecords[action.payload.date] = { income: 0, expenses: 0 };
      }
      state.dailyRecords[action.payload.date].income += action.payload.income;
      state.balance += action.payload.income; 
    },

    addExpense: (state, action: PayloadAction<{expenses: number, date: string}>) => {
      // const date = new Date().toISOString().split('T')[0];
      if (!state.dailyRecords[action.payload.date]) {
        state.dailyRecords[action.payload.date] = { income: 0, expenses: 0 };
      }
      state.dailyRecords[action.payload.date].expenses += action.payload.expenses;
      state.balance -= action.payload.expenses; 
    },

    chooseCurrency: (state, action: PayloadAction<{code: string, symbol: string, name: string}>) => {
      state.currency = action.payload;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const {addExpense, addIncome, chooseCurrency} = budgetSlice.actions

export default budgetSlice.reducer