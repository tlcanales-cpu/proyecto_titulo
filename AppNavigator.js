import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MedicamentosScreen from '../screens/MedicamentoScreen';
import CarritoScreen from '../screens/CarritoScreen';
import HistorialPedidosScreen from '../screens/HistorialPedidosScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Home' component={HomeScreen}/>
      <Stack.Screen name='MedicamentosScreen' component={MedicamentosScreen} />
      <Stack.Screen name='CarritoScreen' component={CarritoScreen} />
      <Stack.Screen name='HistorialPedidosScreen' component={HistorialPedidosScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
