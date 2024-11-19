import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Pen from '../assets/pictures/pen.svg';
import CustomBttnSvg from '../components/CustomBttnSvg';
import { useAppSelector } from '../redux/store/hooks';
import { RootState } from '../redux/store/store';
import { themes } from '../styles/themes';


interface CategoryItemProps {
    item: { name: string; sum: number };
    onEdit?: () => void
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, onEdit }) => {

  const currency = useAppSelector((state: RootState) => state.budget.currency);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const theme = isDarkMode ? themes.dark : themes.light;

    return (
      <View style={styles.container}>
        <Text style={[styles.name, {color: theme.text}]}>{item.name}</Text>
        <View style={{flex: 1}}/>
        {onEdit ?
          <CustomBttnSvg onPress={onEdit} style={[styles.customBttn, {backgroundColor: theme.button}]}>
            <Pen/>
          </CustomBttnSvg> :
          <Text style={[styles.name, {color: theme.text}]}>{item.sum} {currency.symbol}</Text>
        }
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
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center'
    }
})
  

export default CategoryItem