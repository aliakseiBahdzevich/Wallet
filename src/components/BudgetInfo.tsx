import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomBttnSvg from '../components/CustomBttnSvg';
import { RootState } from '../redux/store/store';
import { useAppSelector } from '../redux/store/hooks';

interface BudgetInfoProps {
    label: string;
    value: number;
    onPress?: () => void;
    buttonSvg?: JSX.Element;
}

const BudgetInfo: React.FC<BudgetInfoProps> = ({ 
    label, 
    value, 
    onPress, 
    buttonSvg 
}) => {
    const currency = useAppSelector((state: RootState) => state.budget.currency);
    return(
        <View style={styles.budgetView}>
          <Text style={styles.budgetTextView}>{label}</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.budgetTextView}>{parseFloat(value.toFixed(2))} {currency.symbol}</Text>
          {buttonSvg ?
            <CustomBttnSvg onPress={onPress} style={styles.customBttn}>
                {buttonSvg}
            </CustomBttnSvg> :
            <View style={{ width: 35, height: 35, marginLeft: 5 }}/>
          }

        </View>
    )
}

const styles = StyleSheet.create({
    budgetView: {
        flexDirection: 'row', 
        paddingVertical: 16,
        alignItems: 'center',
    },
    budgetTextView: {
        fontWeight: 'regular', 
        fontSize: 16
    },
    customBttn: {
        width: 35,
        height: 35, 
        backgroundColor: '#FFFFF',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    }
})

export default BudgetInfo