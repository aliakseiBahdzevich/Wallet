import React from 'react';
import { View, Text, TouchableOpacity, FlexAlignType, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import CustomBttnSvg from '../components/CustomBttnSvg';
import { themes } from '../styles/themes';
import { useAppSelector } from '../redux/store/hooks';

interface CategoryModalProps {
    isVisible: boolean;
    onClose: () => void;
    label: string;
    inputValue: string;
    onChangeInput: (value: string) => void;
    buttonText: string;
    onButtonPress: () => void;
    onDeleteButtonPress?: () => void;
    deleteButtonText?: string;
  }

const CategoryModal: React.FC<CategoryModalProps> = ({
    isVisible,
    onClose,
    label,
    inputValue,
    onChangeInput,
    buttonText,
    onButtonPress,
    onDeleteButtonPress,
    deleteButtonText,
  }) => {
    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
    const theme = isDarkMode ? themes.dark : themes.light;
    return (
      <View style={styles.container}>
      <Modal isVisible={isVisible} onBackdropPress={onClose} animationIn={"zoomIn"} animationOut={"zoomOut"}>
        <View style={[styles.modalView, {backgroundColor: theme.background}]}>
          <TextInput
            style={{ marginBottom: 10, width: '100%', backgroundColor: theme.background }}
            label={label}
            value={inputValue}
            onChangeText={onChangeInput}
            mode='outlined'
            textColor={theme.text}
          />
          <CustomBttnSvg onPress={()=>{onButtonPress(); onClose()}} style={{ marginBottom: 10, width: '100%', backgroundColor: theme.button, borderRadius: 12, padding: 16}}>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: theme.text }}>{buttonText}</Text>
          </CustomBttnSvg>
          {deleteButtonText && onDeleteButtonPress &&
            <CustomBttnSvg onPress={()=>{onDeleteButtonPress(); onClose()}} style={{width: '100%', backgroundColor: '#E05139', borderRadius: 12, padding: 16}}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: theme.text }}>{deleteButtonText}</Text>
            </CustomBttnSvg>
          }
        </View>
      </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    modalView: {
      backgroundColor: '#F7FAFA',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      width: '100%',
    },
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 16
    },
  });
  
  export default CategoryModal;