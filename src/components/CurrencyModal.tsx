import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import Pen from '../../assets/pen.svg';
import CustomBttnSvg from '../components/CustomBttnSvg';
import { Dropdown } from 'react-native-element-dropdown';
import { currencies } from '../assets/currencies';
import Modal from 'react-native-modal';
import { useAppDispatch } from '../redux/store/hooks';
import { chooseCurrency } from '../redux/features/budgetSlice';



interface CurrencyModalProps {
    isVisible: boolean
    onClose: () => void;
}

const CurrencyModal: React.FC<CurrencyModalProps> = ({
    isVisible,
    onClose
  }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [symbol, setSymbol] = useState('');
    const data = currencies.map((item, index)=> ({label: item.name, value: `${item.name}-${index}`, code: item.code, symbol: item.symbol}));

    return (
        <Modal 
            isVisible={isVisible} 
            onBackdropPress={()=>{
                setValue(''); 
                setName(''); 
                onClose()
            }} 
            animationIn={"zoomIn"}
            animationOut={"zoomOut"}>
            <View style = {styles.modalView}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
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
          style = {styles.button} 
          onPress = {()=>{
            dispatch(chooseCurrency({code: code, name: name, symbol: symbol})); 
            onClose(); setName(''); setValue('')}}
        >
          <Text style={styles.buttonText}>Сохранить</Text>
        </CustomBttnSvg>
        </View>
    </Modal>
   
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
  button: {
    width: '100%', 
    backgroundColor: '#39E079', 
    borderRadius: 12, 
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#141414', 
    fontWeight: 'bold', 
    fontSize: 16, 
    lineHeight: 24
  }
}); 

export default CurrencyModal
        









