import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import Pen from '../../assets/pictures/pen.svg';
import CustomBttnSvg from '../../components/CustomBttnSvg';
import { Dropdown } from 'react-native-element-dropdown';
import { currencies } from '../../assets/files/currencies';
import Modal from 'react-native-modal';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import CurrencyModal from '../../components/CurrencyModal';
import { themes } from '../../styles/themes';
import { toggleTheme } from '../../redux/features/themeSlice';




const SettingsScreen = () => {

  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const theme = isDarkMode ? themes.dark : themes.light;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const currentCurrency = useAppSelector((state: any) => state.budget.currency);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
   <View style={[styles.container, {backgroundColor: theme.background}]}>
    <View style={[styles.titleView]}>
      <Text style={[styles.title, {color: theme.text}]}>Бюджет</Text>
    </View>
    <View style={styles.view}>
      <Text style={[styles.text, {color: theme.text}]}>Текущая валюта:</Text>
      <View style={{flex: 1}}/>
      <Text style={[styles.text, {color: theme.text}]}>{currentCurrency.name} ({currentCurrency.code})</Text>
    </View>
    <CustomBttnSvg style={[styles.button, {backgroundColor: theme.button}]} onPress={handleOpen}>
      <Text style={[styles.buttonText, {color: theme.text}]}>Сменить валюту</Text>
    </CustomBttnSvg>
    <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
      <Text>Сменить тему</Text>
    </TouchableOpacity>
    <CurrencyModal isVisible={isVisible} onClose={handleClose} />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    paddingHorizontal: 16,    
  },
  button: {
    width: '100%', 
    borderRadius: 12, 
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold', 
    lineHeight: 23,
  },
  titleView: {
    margin: 10
  },
});

export default SettingsScreen;
