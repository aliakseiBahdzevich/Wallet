import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlexAlignType, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import CustomBttnSvg from '../components/CustomBttnSvg';
import { Dropdown } from 'react-native-element-dropdown';
import { RootState } from '../redux/store/store';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { useDispatch } from 'react-redux';
import { addSumCategory } from '../redux/features/categoriesSlice';
import { themes } from '../styles/themes';


interface CategoryModalProps {
    isVisible: boolean;
    onClose: () => void;
    label: string;
    inputValue: string;
    onChangeInput: (value: string) => void;
    incomeButtonPress?: () => void;
    incomeButtonText?: string;
    expenseButtonPress?: () => void;
    expenseButtonText?: string;
  }

  const CategoryModal: React.FC<CategoryModalProps> = React.memo(({
    isVisible,
    onClose,
    label,
    inputValue,
    onChangeInput,
    incomeButtonPress,
    incomeButtonText,
    expenseButtonPress,
    expenseButtonText,
  }) => {
    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
    const theme = isDarkMode ? themes.dark : themes.light;
    const categories = useAppSelector((state: RootState) => state.categories.categories);
    const data = categories.map((item, index) => ({label: item.name, value: `${item.name}-${index}`}));
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    
    return (
      <View style={styles.container}>
      <Modal isVisible={isVisible} onBackdropPress={()=>{onClose(); setName(''); setValue('')}} animationIn={"zoomIn"} animationOut={"zoomOut"}>
        <View style={[styles.modalView, {backgroundColor: theme.background}]}>
          <TextInput
            style={{ marginBottom: 10, width: '100%', backgroundColor: theme.background }}
            label={label}
            value={inputValue} 
            onChangeText={onChangeInput}
            keyboardType="decimal-pad"
            mode="outlined"
            textColor={theme.text}
          />
          {incomeButtonText && incomeButtonPress &&
            <CustomBttnSvg onPress={() => { incomeButtonPress(); onClose()}} style={{ width: '100%', backgroundColor: theme.button, borderRadius: 12, padding: 16}}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: theme.text }}>{incomeButtonText}</Text>
            </CustomBttnSvg>
          }
          {expenseButtonText && expenseButtonPress &&
          <>
            <CustomBttnSvg 
              onPress={() => { 
                expenseButtonPress(); 
                dispatch(addSumCategory({name: name, sum: Number(inputValue)})); 
                setValue('');
                setName('');
                onClose()
              }} 
              style={{ width: '100%', backgroundColor: theme.button, borderRadius: 12, padding: 16 }}
            >
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: theme.text }}>{expenseButtonText}</Text>
            </CustomBttnSvg>
            
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={[styles.placeholderStyle, {color: theme.text}]}
              selectedTextStyle={[styles.selectedTextStyle, {color: theme.text}]}
              containerStyle={{backgroundColor: theme.background}}
              itemTextStyle={{color: theme.text}}
              itemContainerStyle={{backgroundColor: theme.background}}
              activeColor={theme.button}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Выберите категорию" 
              value={value}
              onChange={(item) => {
                setValue(item.value);
                setName(item.label);
              }}            
            />
          </>
          }
        </View>
      </Modal>
      </View>
    );
  });
  

  
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 16
    },
    modalView: {
      backgroundColor: '#F7FAFA',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      width: '100%',
    },
    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'white',
      borderBottomWidth: 0.5,
      width: '100%',
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      
    },
    selectedTextStyle: {
      fontSize: 16,
      
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      width: '100%',
    },
  });
  
  export default CategoryModal;