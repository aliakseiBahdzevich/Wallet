import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SetUpBudgetScreen = () => {
  const [amount, setAmount] = React.useState('');

  const handleSave = () => {
    // Logic to save the budget
    console.log(`Budget set to: ${amount}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up Your Budget</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter budget amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Save Budget" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default SetUpBudgetScreen;
