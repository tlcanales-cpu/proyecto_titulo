import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // SIMULACIÓN: Si escriben algo, pasan.
    if (email.length > 0 && password.length > 0) {
        navigation.replace('Home'); // Usamos replace para que no puedan volver atrás al login
    } else {
        Alert.alert('Atención', 'Por favor ingrese sus datos para continuar.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Círculo decorativo superior */}
      <View style={styles.circle} />
      
      <Text style={styles.title}>Nature</Text>
      <Text style={styles.subtitle}>Salud y bienestar a tu puerta</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
            style={styles.input}
            placeholder="******"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>INGRESAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>¿No tienes cuenta? Crear una aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F7FA', justifyContent: 'center', padding: 20 },
  circle: { position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: '#B2EBF2' },
  title: { fontSize: 40, fontWeight: 'bold', color: '#00695C', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#004D40', textAlign: 'center', marginBottom: 40 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 15, elevation: 5, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.2 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  input: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 15, marginBottom: 20, fontSize: 16, borderWidth: 1, borderColor: '#DDD' },
  button: { backgroundColor: '#00796B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  linkText: { marginTop: 20, textAlign: 'center', color: '#00796B', fontSize: 16, textDecorationLine: 'underline' }
});