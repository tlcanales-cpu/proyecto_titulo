import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCarrito } from '../contexts/CarritoContext';

const CarritoScreen = ({ navigation }) => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  const envio = 2500; // Costo fijo de envío simulado
  const totalFinal = carrito.length > 0 ? total + envio : 0;

  const confirmarCompra = () => {
    Alert.alert(
      "Confirmar Pedido",
      `¿Desea realizar la compra por $${totalFinal}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "CONFIRMAR", 
          onPress: () => {
            Alert.alert("¡Éxito!", "Tu pedido ha sido enviado. Un dron va en camino 🚁");
            vaciarCarrito();
            navigation.navigate('Home');
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemNombre}>{item.nombre}</Text>
        <Text style={styles.itemFarmacia}>{item.farmacia}</Text>
        <Text style={styles.itemPrecio}>${item.precio}</Text>
      </View>
      <TouchableOpacity onPress={() => eliminarDelCarrito(item._id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resumen de Compra</Text>

      {carrito.length === 0 ? (
        <View style={styles.emptyContainer}>
            <Text style={{fontSize: 50}}>🛒</Text>
            <Text style={styles.vacio}>Tu carrito está vacío</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>Volver al Catálogo</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={carrito}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={styles.list}
          />
          
          <View style={styles.summaryContainer}>
            <View style={styles.row}>
                <Text style={styles.label}>Subtotal:</Text>
                <Text style={styles.value}>${total}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Envío Dron:</Text>
                <Text style={styles.value}>${envio}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
                <Text style={styles.totalLabel}>TOTAL:</Text>
                <Text style={styles.totalValue}>${totalFinal}</Text>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={confirmarCompra}>
                <Text style={styles.confirmText}>PAGAR AHORA</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CarritoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F6' },
  header: { fontSize: 24, fontWeight: 'bold', padding: 20, color: '#333', backgroundColor: 'white' },
  list: { padding: 15 },
  itemCard: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  itemNombre: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  itemFarmacia: { fontSize: 14, color: '#777', fontStyle: 'italic' },
  itemPrecio: { fontSize: 16, color: '#117864', fontWeight: 'bold', marginTop: 5 },
  deleteBtn: { padding: 10, backgroundColor: '#FFEBEE', borderRadius: 8 },
  deleteText: { fontSize: 18 },
  
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  vacio: { fontSize: 20, color: '#888', marginTop: 10 },
  backButton: { marginTop: 20, backgroundColor: '#117864', padding: 15, borderRadius: 10 },
  backText: { color: 'white', fontWeight: 'bold' },

  summaryContainer: { backgroundColor: 'white', padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 16, color: '#555' },
  value: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 10 },
  totalLabel: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#E67E22' },
  
  confirmButton: { backgroundColor: '#117864', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  confirmText: { color: 'white', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 }
});