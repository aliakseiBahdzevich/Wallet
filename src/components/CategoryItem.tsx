import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Pen from '../assets/pen.svg';

interface CategoryItemProps {
    item: { name: string; sum: number };
    onEdit: () => void
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, onEdit }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={{flex: 1}}/>
        <TouchableOpacity onPress={onEdit}>
          <Pen/>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    name: {
        color: 'black',
        fontSize: 16, 
        marginVertical: 8
    },
    container: {
        flexDirection: 'row'
    }
})
  

export default CategoryItem