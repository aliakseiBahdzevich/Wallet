import React from 'react';
import { View, Text, TouchableOpacity, FlexAlignType, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';

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
      <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <View style={styles.modalView}>
          <TextInput
            style={{ marginBottom: 10, width: '100%' }}
            label={label}
            value={inputValue}
            onChangeText={onChangeInput}
            mode='outlined'
          />
          <TouchableOpacity onPress={()=>{onButtonPress(); onClose()}} style={{ marginBottom: 10, width: '100%', backgroundColor: '#39E079', borderRadius: 12, padding: 16}}>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{buttonText}</Text>
          </TouchableOpacity>
          {deleteButtonText && onDeleteButtonPress &&
            <TouchableOpacity onPress={()=>{onDeleteButtonPress(); onClose()}} style={{width: '100%', backgroundColor: '#E05139', borderRadius: 12, padding: 16}}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{deleteButtonText}</Text>
            </TouchableOpacity>
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