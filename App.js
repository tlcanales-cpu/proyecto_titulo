import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { CarritoProvider } from './contexts/CarritoContext';

export default function App() {
  return (
    <CarritoProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CarritoProvider>
  );
}
