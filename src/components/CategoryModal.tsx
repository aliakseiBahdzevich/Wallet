import React from 'react';
import { View, Text, TouchableOpacity, FlexAlignType, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import CustomBttnSvg from '../components/CustomBttnSvg';

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
    return (
      <Modal isVisible={isVisible} onBackdropPress={onClose} animationIn={"zoomIn"} animationOut={"zoomOut"}>
        <View style={styles.modalView}>
          <TextInput
            style={{ marginBottom: 10, width: '100%' }}
            label={label}
            value={inputValue}
            onChangeText={onChangeInput}
            mode='outlined'
          />
          <CustomBttnSvg onPress={()=>{onButtonPress(); onClose()}} style={{ marginBottom: 10, width: '100%', backgroundColor: '#39E079', borderRadius: 12, padding: 16}}>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{buttonText}</Text>
          </CustomBttnSvg>
          {deleteButtonText && onDeleteButtonPress &&
            <CustomBttnSvg onPress={()=>{onDeleteButtonPress(); onClose()}} style={{width: '100%', backgroundColor: '#E05139', borderRadius: 12, padding: 16}}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{deleteButtonText}</Text>
            </CustomBttnSvg>
          }
        </View>
      </Modal>
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
    }
  });
  
  export default CategoryModal;