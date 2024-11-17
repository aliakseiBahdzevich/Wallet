import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Pen from '../assets/pen.svg';
import CustomBttnSvg from '../components/CustomBttnSvg';

interface CategoryItemProps {
    item: { name: string; sum: number };
    onEdit: () => void
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, onEdit }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={{flex: 1}}/>
        {/* <Text style={styles.name}>{item.sum}</Text> */}
        <CustomBttnSvg onPress={onEdit} style={styles.customBttn}>
          <Pen/>
        </CustomBttnSvg> 
      </View>
    );
};

const styles = StyleSheet.create({
    name: {
      color: 'black',
      fontSize: 16, 
      marginVertical: 15
    },
    container: {
      flexDirection: 'row'
    },
    customBttn: {
      width: 35,
      height: 35, 
      backgroundColor: '#FFFFF',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center'
    }
})
  

export default CategoryItem