import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CarritoScreen from '../screens/CarritoScreen';
import CentrosScreen from '../screens/CentrosScreen';
import HistorialPedidosScreen from '../screens/HistorialPedidosScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MedicamentosScreen from '../screens/MedicamentoScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import RecordatoriosScreen from '../screens/RecordatoriosScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
            headerStyle: { backgroundColor: '#00695C' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        }}
    >
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name='Register' component={RegisterScreen} options={{title: 'Crear Cuenta'}} />
      <Stack.Screen name='Home' component={HomeScreen} options={{title: 'Inicio'}}/>
      <Stack.Screen name='MedicamentosScreen' component={MedicamentosScreen} options={{headerShown: false}}/>
      <Stack.Screen name='ProductDetailScreen' component={ProductDetailScreen} options={{title: 'Detalle del Producto'}}/>
      <Stack.Screen name='CarritoScreen' component={CarritoScreen} options={{title: 'Mi Carrito'}}/>
      <Stack.Screen name='HistorialPedidosScreen' component={HistorialPedidosScreen} options={{title: 'Mis Compras'}}/>
      <Stack.Screen name='CentrosScreen' component={CentrosScreen} options={{title: 'Farmacias Cercanas'}}/>
      <Stack.Screen name='RecordatoriosScreen' component={RecordatoriosScreen} options={{title: 'Mis Recordatorios'}}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;