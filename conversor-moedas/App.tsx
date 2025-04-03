import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './src/screens/HomeScreen';
import ConverterScreen from './src/screens/ConverterScreen';
import AboutScreen from './src/screens/AboutScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import { ThemeProvider } from './src/context/ThemeContext';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Conversor" component={ConverterScreen} />
          <Drawer.Screen name="Sobre" component={AboutScreen} />
          <Drawer.Screen name="Histórico" component={HistoryScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
