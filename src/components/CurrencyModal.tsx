import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import Pen from '../../assets/pictures/pen.svg';
import CustomBttnSvg from '../components/CustomBttnSvg';
import { Dropdown } from 'react-native-element-dropdown';
import { currencies } from '../assets/files/currencies';
import Modal from 'react-native-modal';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { chooseCurrency } from '../redux/features/budgetSlice';
import { themes } from '../styles/themes';



interface CurrencyModalProps {
    isVisible: boolean
    onClose: () => void;
}

const CurrencyModal: React.FC<CurrencyModalProps> = ({
    isVisible,
    onClose
  }) => {
    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
    const theme = isDarkMode ? themes.dark : themes.light;
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [symbol, setSymbol] = useState('');
    const data = currencies.map((item, index)=> ({label: item.name, value: `${item.name}-${index}`, code: item.code, symbol: item.symbol}));
    const modalClose = () => {
        if(value!==''){
            dispatch(chooseCurrency({code: code, name: name, symbol: symbol})); 
        } 
        onClose(); setName(''); setValue('')
    }

    return (
      <View style={styles.container}>
        <Modal 
            isVisible={isVisible} 
            onBackdropPress={()=>{
                setValue(''); 
                setName(''); 
                onClose()
            }} 
            animationIn={"zoomIn"}
            animationOut={"zoomOut"}
            >
            <View style = {[styles.modalView, {backgroundColor: theme.background}]}>
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
                    placeholder="Выберите валюту" 
                    value={value}
                    onChange={(item) => {
                        setValue(item.value);
                        setName(item.label);
                        setCode(item.code)
                        setSymbol(item.symbol)
                    }}            
                />
        <CustomBttnSvg 
          style = {[styles.button, {backgroundColor: theme.button}]} 
          onPress = {modalClose}
        >
          <Text style={[styles.buttonText, {color: theme.text}]}>Сохранить</Text>
        </CustomBttnSvg>
        </View>
    </Modal>
    </View>
   
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 16
  },
  modalView: {
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
  button: {
    width: '100%', 
    backgroundColor: '#39E079', 
    borderRadius: 12, 
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 16, 
    lineHeight: 24
  }
}); 

export default CurrencyModal
        









