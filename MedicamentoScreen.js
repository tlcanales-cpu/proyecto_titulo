import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity
} from 'react-native';
import { getMedicamentos } from '../services/medicamentos';

import { useCarrito } from '../contexts/CarritoContext';

export default function MedicamentoScreen({ navigation }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMedicamentos();
      setMedicamentos(data);
    };
    fetchData();
  }, []);

  const medicamentosFiltrados = medicamentos.filter(med => {
    const coincideNombre = med.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada
      ? med.categoria === categoriaSeleccionada
      : true;
    return coincideNombre && coincideCategoria;
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text>{item.descripcion}</Text>
      <Text>Categoría: {item.categoria}</Text>
      <Text>Precio: ${item.precio}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => agregarAlCarrito(item)}
      >
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medicamentos</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.navigate('CarritoScreen')}>
          <Text style={styles.link}>🛒 Ir al carrito</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HistorialPedidosScreen')}>
          <Text style={styles.link}>📄 Ver historial</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <Picker
        selectedValue={categoriaSeleccionada}
        style={styles.picker}
        onValueChange={setCategoriaSeleccionada}
      >
        <Picker.Item label="Todas las categorías" value="" />
        <Picker.Item label="Analgésico" value="analgésico" />
        <Picker.Item label="Antibiótico" value="antibiótico" />
        <Picker.Item label="Antiinflamatorio" value="antiinflamatorio" />
        <Picker.Item label="Vitaminas" value="vitaminas" />
      </Picker>

      <FlatList
        data={medicamentosFiltrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    height: 45, borderColor: '#ccc', borderWidth: 1,
    borderRadius: 8, paddingHorizontal: 10, marginBottom: 10
  },
  picker: { height: 50, marginBottom: 10 },
  card: {
    backgroundColor: '#f0f8ff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  button: {
    backgroundColor: '#008080',
    marginTop: 10,
    padding: 10,
    borderRadius: 8
  },
  buttonText: { color: '#fff', textAlign: 'center' },
  link: {
    color: '#0066cc',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 10
  }
});
