import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleRegister = () => {
    if (!nombre || !email || !direccion) {
      Alert.alert('Faltan datos', 'Por favor completa el formulario.');
      return;
    }
    Alert.alert('¡Bienvenido!', 'Tu cuenta ha sido creada con éxito.');
    navigation.replace('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Únete para recibir tus medicamentos en minutos</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej: Juan Pérez" />
        
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Ej: correo@email.com" />
        
        <Text style={styles.label}>Dirección de Entrega (Para Drones)</Text>
        <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} placeholder="Ej: Av. Siempre Viva 123" />
        
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} secureTextEntry placeholder="******" />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{padding: 20}}>
         <Text style={styles.link}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#E0F2F1', padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#00695C', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 30 },
  form: { backgroundColor: 'white', padding: 25, borderRadius: 15, elevation: 4 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 15, fontSize: 16 },
  button: { backgroundColor: '#00796B', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  link: { textAlign: 'center', color: '#00695C', textDecorationLine: 'underline', fontSize: 16 }
});