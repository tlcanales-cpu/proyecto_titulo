import { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCarrito } from '../contexts/CarritoContext';
import { MOCK_MEDICAMENTOS } from '../services/mockData';

const CATEGORIAS = ["Todos", "Analgésico", "Antiinflamatorio", "Crónicos", "Antibiótico", "Vitaminas"];

export default function MedicamentoScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');
  const [catSeleccionada, setCatSeleccionada] = useState("Todos");
  const { agregarAlCarrito } = useCarrito();

  const medicamentosFiltrados = MOCK_MEDICAMENTOS.filter(med => {
    const matchTexto = med.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchCat = catSeleccionada === "Todos" || med.categoria === catSeleccionada;
    return matchTexto && matchCat;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ProductDetailScreen', { producto: item })}
    >
      <View style={{flexDirection: 'row'}}>
        {/* Imagen del producto */}
        <Image source={{ uri: item.imagen }} style={styles.imagen} resizeMode="contain" />
        
        <View style={{flex: 1, paddingLeft: 10}}>
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.cat}>{item.categoria}</Text>
            <Text style={styles.price}>${item.precio}</Text>
            <Text numberOfLines={2} style={styles.desc}>{item.descripcion}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
            agregarAlCarrito(item);
            alert(`✅ ${item.nombre} agregado`);
        }}
      >
        <Text style={styles.addButtonText}>AGREGAR AL CARRITO</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.headerContainer}>
          <Text style={styles.header}>Farmacia Digital</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CarritoScreen')} style={styles.cartButton}>
            <Text style={{fontSize: 24}}>🛒</Text>
          </TouchableOpacity>
      </View>
      
      {/* Buscador */}
      <TextInput
        style={styles.input}
        placeholder="🔍 Buscar medicamento..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* Filtros de Categoría */}
      <View style={{height: 60}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 5}}>
            {CATEGORIAS.map((cat) => (
                <TouchableOpacity 
                    key={cat} 
                    style={[styles.catBadge, catSeleccionada === cat && styles.catBadgeActive]}
                    onPress={() => setCatSeleccionada(cat)}
                >
                    <Text style={[styles.catText, catSeleccionada === cat && styles.catTextActive]}>{cat}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      <FlatList
        data={medicamentosFiltrados}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F4F6F6' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#117864' },
  cartButton: { backgroundColor: '#D1F2EB', padding: 8, borderRadius: 50 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 12, fontSize: 18, marginBottom: 15, elevation: 2, borderWidth: 1, borderColor: '#ddd' },
  
  // Estilos de Categoría
  catBadge: { backgroundColor: '#E0E0E0', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginRight: 10, height: 40, justifyContent: 'center' },
  catBadgeActive: { backgroundColor: '#117864' },
  catText: { fontSize: 16, color: '#333', fontWeight: '600' },
  catTextActive: { color: 'white' },

  // Estilos de Tarjeta
  card: { backgroundColor: 'white', padding: 15, marginBottom: 15, borderRadius: 15, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  imagen: { width: 90, height: 90, borderRadius: 10, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  cat: { fontSize: 14, color: '#16A085', fontStyle: 'italic', marginBottom: 2 },
  price: { fontSize: 22, fontWeight: 'bold', color: '#E67E22', marginVertical: 2 },
  desc: { fontSize: 14, color: '#777' },
  
  addButton: { backgroundColor: '#117864', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});