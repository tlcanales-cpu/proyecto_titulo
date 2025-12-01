import { NavigationContainer } from '@react-navigation/native';
import { CarritoProvider } from './contexts/CarritoContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <CarritoProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CarritoProvider>
  );
}
