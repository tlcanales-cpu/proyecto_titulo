import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../utils/notifications';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const pushToken = await registerForPushNotificationsAsync();

      const response = await fetch('http://localhost:8081', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, pushToken })
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('usuarioId', data.usuario._id);
        Alert.alert('Éxito', 'Sesión iniciada');
        navigation.navigate('MedicamentosScreen');
      } else {
        Alert.alert('Error', data.message || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

// estilos omitidos por brevedad, iguales a la versión anterior


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, marginBottom: 30, textAlign: 'center', fontWeight: 'bold' },
  input: {
    height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10,
    paddingHorizontal: 10, marginBottom: 15
  },
  button: { backgroundColor: '#008080', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  linkText: {
    marginTop: 20, color: '#0066cc',
    textAlign: 'center', textDecorationLine: 'underline'
  }
});
