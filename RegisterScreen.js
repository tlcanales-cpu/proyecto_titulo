import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');

  const handleRegister = async () => {
    if (!nombre || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Registro exitoso', data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'No se pudo registrar');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error de conexión con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff'
  },
  title: {
    fontSize: 26, marginBottom: 30, textAlign: 'center', fontWeight: 'bold'
  },
  input: {
    height: 50, borderColor: '#ccc', borderWidth: 1,
    borderRadius: 10, paddingHorizontal: 10, marginBottom: 15
  },
  button: {
    backgroundColor: '#0066cc', padding: 15, borderRadius: 10
  },
  buttonText: {
    color: '#fff', textAlign: 'center', fontSize: 16
  }
});
