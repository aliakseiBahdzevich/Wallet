import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import Pen from '../../assets/pictures/pen.svg';
import CustomBttnSvg from '../../components/CustomBttnSvg';
import { Dropdown } from 'react-native-element-dropdown';
import { currencies } from '../../assets/files/currencies';
import Modal from 'react-native-modal';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { chooseCurrency } from '../../redux/features/budgetSlice';
import CurrencyModal from '../../components/CurrencyModal';



const SettingsScreen = () => {

  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const currentCurrency = useAppSelector((state: any) => state.budget.currency);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
   <View style={styles.container}>
    <View style={styles.view}>
      <Text style={styles.text}>Текущая валюта:</Text>
      <View style={{flex: 1}}/>
      <Text style={styles.text}>{currentCurrency.name} ({currentCurrency.code})</Text>
    </View>
    {/* <Text style={styles.text}>Текущая валюта</Text> */}
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
    // justifyContent: 'center',
    padding: 16
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
  },
  text: {
    fontSize: 16,
    fontWeight: 'regular',
  },
  view: {
    flexDirection: 'row',
    marginVertical: 16
  }
});

export default SettingsScreen;
