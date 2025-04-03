import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigationState } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function CustomDrawerContent(props: any) {
  const { theme, toggleTheme } = useTheme();
  const state = useNavigationState((state) => state);
  const currentRoute = state?.routes?.[state.index]?.name || '';

  const isOnConversor = currentRoute === 'Conversor';
  const isOnHistorico = currentRoute === 'Histórico';

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.background }}>
      <DrawerItem
        label="Sobre"
        onPress={() => props.navigation.navigate('Sobre')}
        labelStyle={{ color: theme.text }}
      />

      {isOnConversor && (
        <>
          <DrawerItem
            label="Histórico"
            onPress={() => props.navigation.navigate('Histórico')}
            labelStyle={{ color: theme.text }}
          />
          <DrawerItem
            label="Home"
            onPress={() => props.navigation.navigate('Home')}
            labelStyle={{ color: theme.text }}
          />
        </>
      )}

      {isOnHistorico && (
        <>
          <DrawerItem
            label="Home"
            onPress={() => props.navigation.navigate('Home')}
            labelStyle={{ color: theme.text }}
          />
          <DrawerItem
            label="Conversor"
            onPress={() => props.navigation.navigate('Conversor')}
            labelStyle={{ color: theme.text }}
          />
        </>
      )}

      <DrawerItem
        label={theme.mode === 'dark' ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
        onPress={toggleTheme}
        labelStyle={{ color: theme.text }}
      />
    </DrawerContentScrollView>
  );
}
