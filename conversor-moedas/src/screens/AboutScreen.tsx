import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function AboutScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>
        Esta aplicação permite converter moedas usando dados atualizados da API Frankfurter.
        Desenvolvido com React Native e Expo.
      </Text>

      <View style={styles.buttonSpacing}>
        <Button
          title="Ir para Home"
          onPress={() => navigation.navigate('Home')}
          color="#007AFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonSpacing: {
    marginTop: 20,
  },
});
