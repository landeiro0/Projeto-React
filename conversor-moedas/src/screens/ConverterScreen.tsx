import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import CurrencyConverter from '../components/CurrencyConverter';
import { useTheme } from '../context/ThemeContext';

export default function ConverterScreen() {
  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.inner, { backgroundColor: theme.background }]}>
          <Text style={[styles.title, { color: theme.text }]}>Conversor de Moedas</Text>
          <CurrencyConverter />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
});
