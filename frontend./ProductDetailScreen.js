import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCarrito } from '../contexts/CarritoContext';

const ProductDetailScreen = ({ route, navigation }) => {
  const { producto } = route.params;
  const { agregarAlCarrito } = useCarrito();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: producto.imagen }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{producto.categoria.toUpperCase()}</Text>
        <Text style={styles.title}>{producto.nombre}</Text>
        <Text style={styles.price}>${producto.precio}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{producto.descripcion}</Text>
        
        <Text style={styles.sectionTitle}>Farmacia</Text>
        <Text style={styles.farmacia}>{producto.farmacia}</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            agregarAlCarrito(producto);
            alert('Agregado al carrito');
            navigation.navigate('CarritoScreen');
          }}
        >
          <Text style={styles.buttonText}>AGREGAR AL CARRITO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { height: 250, backgroundColor: '#F9F9F9', justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200 },
  detailsContainer: { padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white', marginTop: -20, shadowColor: "#000", shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, elevation: 5 },
  category: { color: '#16A085', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginVertical: 5 },
  price: { fontSize: 28, fontWeight: 'bold', color: '#E67E22', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#555', marginTop: 10 },
  description: { fontSize: 18, color: '#666', lineHeight: 26, marginBottom: 15 },
  farmacia: { fontSize: 18, color: '#333', fontStyle: 'italic', marginBottom: 30 },
  button: { backgroundColor: '#117864', padding: 18, borderRadius: 15, alignItems: 'center', elevation: 3 },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});