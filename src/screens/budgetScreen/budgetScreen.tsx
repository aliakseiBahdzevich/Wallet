import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, useWindowDimensions, FlatList } from 'react-native';
import Pen from '../../assets/pictures/pen.svg';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { RootState } from '../../redux/store/store';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { addExpense, addIncome } from '../../redux/features/budgetSlice';
import BudgetModal from '../../components/BudgetModal'
import BudgetInfo from '../../components/BudgetInfo';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dropdown } from 'react-native-element-dropdown';
import CategoryItem from '../../components/CategoryItem';
import { useTheme } from '../../context/ThemeContext';



const BudgetScreen = () => {

  const {theme} = useTheme()  
  const [incomesModalVisible, setIncomesModalVisible] = useState(false);
  const [expensesModalVisible, setExpensesModalVisible] = useState(false);
  const [incomes, setIncomes] = useState<string>('');  
  const [expenses, setExpenses] = useState<string>(''); 

  const categories = useAppSelector((state: RootState) => state.categories.categories);
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state: RootState) => state.budget.balance);
  const today = new Date().toISOString().split('T')[0];
  const dailyRecords = useAppSelector((state: RootState) => state.budget.dailyRecords[today]);
  const dailyIncomes = dailyRecords?.income || 0;
  const dailyExpenses = dailyRecords?.expenses || 0;
  const sumCtgrs = categories.reduce((acc, item) => acc + item.sum, 0);
  const withoutCtgry = Math.abs(dailyExpenses - sumCtgrs)
  const currency = useAppSelector((state: RootState) => state.budget.currency);
  
  const handleChangeText = useCallback((newText: string) => {
    if (/^\d*\.?\d{0,2}$/.test(newText)) {
      if (incomesModalVisible) {
        setIncomes(newText);
      } else if (expensesModalVisible) {
        setExpenses(newText);
      }
    }
  }, [incomesModalVisible, expensesModalVisible]); 

  const openExpensesModal = useCallback(() => {
    setExpensesModalVisible(true);
  }, []);

  const closeExpensesModal = useCallback(() => {
    setExpensesModalVisible(false);
  }, []);

  const openIncomesModal = useCallback(() => {
    setIncomesModalVisible(true);
  }, []);

  const closeIncomesModal = useCallback(() => {
    setIncomesModalVisible(false);
  }, []);

  const newIncome = useCallback(() => {
    const roundedValue = parseFloat(incomes || '0').toFixed(2);
    dispatch(addIncome({ income: parseFloat(roundedValue), date: today }));
  }, [incomes, today])
    

  const newExpense = useCallback(() => {
    const roundedValue = parseFloat(expenses || '0').toFixed(2);
    dispatch(addExpense({ expenses: parseFloat(roundedValue), date: today }));
  }, [expenses, today])
  
  const renderItem = useCallback(
    ({ item }: { item: { name: string; sum: number } }) => (
      <CategoryItem item={item} />
    ),[categories.length]
  );

  return (
    <ScrollView style={[styles.scrollView, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={[styles.title, {color: theme.text}]}>Бюджет</Text>
        </View>

        <BudgetInfo
          label="Доходы сегодня: "
          value={parseFloat(dailyIncomes.toFixed(2))}
          onPress={openIncomesModal}
          buttonSvg={<Pen />}
        />

        <BudgetInfo
          label="Расходы сегодня: "
          value={parseFloat(dailyExpenses.toFixed(2))}
          onPress={openExpensesModal}
          buttonSvg={<Pen />}
        />

        <BudgetInfo
          label="Баланс: "
          value={parseFloat(balance.toFixed(2))}
        />

        <View style={styles.statsView}>
          <Text style={[styles.expenses, {color: theme.text}]}>Расходы</Text>
          <Text style={[styles.expensesNum, {color: theme.text}]}> {currency.symbol} {dailyExpenses}</Text>
          <Text style={[styles.expenses, { color: '#7D9F7D' }]}>Сегодня</Text>
          <View style={styles.statsView}>
            <FlatList data={categories} renderItem={renderItem} scrollEnabled={false}/>
            <View style={{marginVertical: 15, flexDirection: 'row'}}>
              <Text style={[styles.expenses, {color: theme.text}]}>Без категории</Text>
              <View style={{flex: 1}}/>
              <Text style={[styles.expenses, {color: theme.text}]}>{withoutCtgry} {currency.symbol}</Text>
            </View>
           
          </View>
        </View>

        {/* <TouchableOpacity style={styles.opacity}>
          <Text style={styles.opacityText}>Создать новый бюджет</Text>
        </TouchableOpacity> */}

        <BudgetModal
          isVisible={incomesModalVisible}
          onClose={() => { closeIncomesModal(); setIncomes(''); }}
          label="Добавьте доход"
          inputValue={incomes}
          onChangeInput={handleChangeText}
          incomeButtonText="Новый доход"
          incomeButtonPress={newIncome}
        />
        <BudgetModal
          isVisible={expensesModalVisible}
          onClose={() => { closeExpensesModal(); setExpenses(''); }}
          label="Добавьте расход"
          inputValue={expenses}
          onChangeInput={handleChangeText}
          expenseButtonText="Новый расход"
          expenseButtonPress={newExpense}
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold', 
    lineHeight: 23,
  },
  titleView: {
    margin: 10
  },
  budgetView: {
    flexDirection: 'row', 
    paddingVertical: 16,
    alignItems: 'center',
  },
  budgetTextView: {
    fontWeight: 'regular', 
    fontSize: 16
  },
  statsView: {
    borderColor: '#D1DEE5', 
    borderWidth: 1,
    // height: '53%', 
    width: '100%', 
    marginVertical: 24, 
    borderRadius: 12, 
    padding: 24, 
  },
  expenses: {
    fontWeight: 'medium', 
    fontSize: 16, 
    lineHeight: 24, 
    marginBottom: 8
  },
  expensesNum: {
    fontWeight: 'bold', 
    fontSize: 32, 
    lineHeight: 40, 
    marginBottom: 8
  },
  scrollView: {
    backgroundColor: '#F7FAFA'
  }
});

export default BudgetScreen;
