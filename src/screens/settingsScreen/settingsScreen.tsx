import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import Pen from '../../assets/pen.svg';
import CustomBttnSvg from '../../components/CustomBttnSvg';
import { Dropdown } from 'react-native-element-dropdown';
import { currencies } from '../../assets/currencies';
import Modal from 'react-native-modal';
import { useAppDispatch } from '../../redux/store/hooks';
import { chooseCurrency } from '../../redux/features/budgetSlice';
import CurrencyModal from '../../components/CurrencyModal';



const SettingsScreen = () => {

  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
   <View style={styles.container}>
    <CustomBttnSvg style={styles.button} onPress={handleOpen}>
      <Text style={styles.buttonText}>Сменить валюту</Text>
    </CustomBttnSvg>
    <CurrencyModal isVisible={isVisible} onClose={handleClose} />
   </View>
  );
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

export default SettingsScreen;
