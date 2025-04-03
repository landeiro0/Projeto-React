import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

type DrawerParamList = {
  Home: undefined;
  Conversor: undefined;
  Sobre: undefined;
  Histórico: undefined;
};

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Bem-vindo ao Conversor de Moedas!
      </Text>

      <View style={styles.buttonSpacing}>
        <Button
          title="Ir para o Conversor"
          onPress={() => navigation.navigate('Conversor')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonSpacing: {
    marginVertical: 6,
  },
});
