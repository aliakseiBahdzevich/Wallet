import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    return(
        <View style={styles.budgetView}>
          <Text style={styles.budgetTextView}>{label}</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.budgetTextView}>BYN {parseFloat(value.toFixed(2))}</Text>
          <TouchableOpacity onPress={onPress}>
            {buttonSvg ? buttonSvg : <View style={{ width: 28, height: 28 }}/>}
          </TouchableOpacity>
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
})

export default BudgetInfo