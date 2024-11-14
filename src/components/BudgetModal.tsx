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
    return (
      <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <View style={styles.modalView}>
          <TextInput
            style={{ marginBottom: 10, width: '100%' }}
            label={label}
            value={inputValue} 
            onChangeText={onChangeInput}
            keyboardType="decimal-pad"
            mode="outlined"
          />
          {incomeButtonText && incomeButtonPress &&
            <TouchableOpacity onPress={() => { incomeButtonPress(); onClose()}} style={{ width: '100%', backgroundColor: '#39E079', borderRadius: 12, padding: 16 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{incomeButtonText}</Text>
            </TouchableOpacity>
          }
          {expenseButtonText && expenseButtonPress &&
            <TouchableOpacity onPress={() => { expenseButtonPress(); onClose()}} style={{ width: '100%', backgroundColor: '#E05139', borderRadius: 12, padding: 16 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{expenseButtonText}</Text>
            </TouchableOpacity>
          }
        </View>
      </Modal>
    );
  });
  

  
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