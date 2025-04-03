import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

export default function CurrencyConverter() {
  const { theme } = useTheme();

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<
    { id: string; from: string; to: string; amount: string; result: string }[]
  >([]);

  const currencies = ['USD', 'EUR', 'GBP', 'BRL', 'JPY', 'AUD', 'CAD'];

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem('conversion_history');
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Erro ao carregar histórico:', e);
      }
    };

    loadHistory();
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Aviso', 'Por favor, insere um valor numérico.');
      return;
    }

    if (fromCurrency === toCurrency) {
      Alert.alert('Aviso', 'Escolhe duas moedas diferentes.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const converted = response.data.rates[toCurrency];
      setResult(converted);

      const newEntry = {
        id: Date.now().toString(),
        from: fromCurrency,
        to: toCurrency,
        amount,
        result: converted.toFixed(2),
      };

      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      await AsyncStorage.setItem('conversion_history', JSON.stringify(updatedHistory));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível converter. Verifica a ligação à internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResult(null);
  };

  const clearHistory = async () => {
    await AsyncStorage.removeItem('conversion_history');
    setHistory([]);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Valor:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
        keyboardType="numeric"
        placeholder="Ex: 100"
        placeholderTextColor={theme.text + '80'}
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={[styles.label, { color: theme.text }]}>Moeda de origem:</Text>
      <Picker
        selectedValue={fromCurrency}
        onValueChange={(itemValue) => setFromCurrency(itemValue)}
        style={[styles.picker, { backgroundColor: theme.input }]}
      >
        {currencies.map((cur) => (
          <Picker.Item key={cur} label={cur} value={cur} />
        ))}
      </Picker>

      <TouchableOpacity onPress={handleSwap} style={styles.swapButton}>
        <Text style={[styles.swapText, { color: theme.text }]}>🔁 Inverter Moedas</Text>
      </TouchableOpacity>

      <Text style={[styles.label, { color: theme.text }]}>Moeda de destino:</Text>
      <Picker
        selectedValue={toCurrency}
        onValueChange={(itemValue) => setToCurrency(itemValue)}
        style={[styles.picker, { backgroundColor: theme.input }]}
      >
        {currencies.map((cur) => (
          <Picker.Item key={cur} label={cur} value={cur} />
        ))}
      </Picker>

      <Button title="Converter" onPress={handleConvert} />

      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      {result !== null && (
        <Text style={[styles.result, { color: theme.text }]}>
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    borderRadius: 5,
    marginBottom: 10,
  },
  swapButton: {
    alignItems: 'center',
    marginVertical: 10,
  },
  swapText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  historyContainer: {
    marginTop: 30,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  historyItem: {
    fontSize: 14,
    marginBottom: 3,
  },
});
