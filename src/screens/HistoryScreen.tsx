import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

type HistoryEntry = {
  id: string;
  from: string;
  to: string;
  amount: string;
  result: string;
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const { theme } = useTheme();

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

  const clearHistory = async () => {
    Alert.alert('Confirmar', 'Tens a certeza que queres limpar o histórico?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          await AsyncStorage.removeItem('conversion_history');
          setHistory([]);
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Histórico de Conversões</Text>

      {history.length === 0 ? (
        <Text style={[styles.text, { color: theme.text }]}>Não há conversões guardadas.</Text>
      ) : (
        history.map((item) => (
          <Text key={item.id} style={[styles.item, { color: theme.text }]}>
            {item.amount} {item.from} → {item.result} {item.to}
          </Text>
        ))
      )}

      {history.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Button title="Limpar Histórico" onPress={clearHistory} color="red" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  item: {
    fontSize: 14,
    marginBottom: 5,
  },
});
