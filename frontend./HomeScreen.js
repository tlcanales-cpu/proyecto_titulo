import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Bienvenida */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>¡Hola, Tomás!</Text>
        <Text style={styles.subGreeting}>¿Qué necesitas hoy?</Text>
      </View>

      {/* Grid de Opciones */}
      <View style={styles.grid}>
        
        {/* Opción 1: Comprar (La más importante) */}
        <TouchableOpacity 
          style={[styles.card, styles.cardPrimary]} 
          onPress={() => navigation.navigate('MedicamentosScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.icon}>💊</Text>
          <Text style={styles.cardTitleLight}>Comprar Medicamentos</Text>
          <Text style={styles.cardSubLight}>Ver catálogo completo</Text>
        </TouchableOpacity>

        <View style={styles.row}>
            {/* Opción 2: Recordatorios */}
            <TouchableOpacity 
              style={[styles.cardSmall, {backgroundColor: '#E8F5E9'}]} 
              onPress={() => navigation.navigate('RecordatoriosScreen')}
            >
              <Text style={styles.iconSmall}>⏰</Text>
              <Text style={styles.cardTitleDark}>Mis Tomas</Text>
            </TouchableOpacity>

            {/* Opción 3: Farmacias */}
            <TouchableOpacity 
              style={[styles.cardSmall, {backgroundColor: '#E0F7FA'}]} 
              onPress={() => navigation.navigate('CentrosScreen')}
            >
              <Text style={styles.iconSmall}>📍</Text>
              <Text style={styles.cardTitleDark}>Farmacias</Text>
            </TouchableOpacity>
        </View>

        {/* Opción 4: Historial */}
        <TouchableOpacity 
          style={[styles.cardHorizontal, {backgroundColor: '#FFF3E0'}]} 
          onPress={() => navigation.navigate('HistorialPedidosScreen')}
        >
          <View>
            <Text style={styles.cardTitleDark}>Mis Pedidos Anteriores</Text>
            <Text style={styles.cardSubDark}>Revisar compras pasadas</Text>
          </View>
          <Text style={styles.iconSmall}>📦</Text>
        </TouchableOpacity>

        {/* Opción 5: Carrito */}
        <TouchableOpacity 
          style={[styles.cardHorizontal, {backgroundColor: '#F3E5F5'}]} 
          onPress={() => navigation.navigate('CarritoScreen')}
        >
          <View>
            <Text style={styles.cardTitleDark}>Mi Carrito</Text>
            <Text style={styles.cardSubDark}>Finalizar compra pendiente</Text>
          </View>
          <Text style={styles.iconSmall}>🛒</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  welcomeSection: { padding: 25, backgroundColor: '#00695C', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginBottom: 20 },
  greeting: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  subGreeting: { fontSize: 18, color: '#B2DFDB', marginTop: 5 },
  
  grid: { padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  
  // Tarjeta Grande (Principal)
  card: { borderRadius: 20, padding: 25, marginBottom: 15, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1 },
  cardPrimary: { backgroundColor: '#117864', alignItems: 'center' },
  
  // Tarjetas Pequeñas
  cardSmall: { width: '48%', borderRadius: 20, padding: 20, alignItems: 'center', elevation: 3, justifyContent: 'center' },
  
  // Tarjetas Horizontales
  cardHorizontal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 20, padding: 20, marginBottom: 15, elevation: 3 },

  // Textos e Iconos
  icon: { fontSize: 50, marginBottom: 10 },
  iconSmall: { fontSize: 35 },
  cardTitleLight: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  cardSubLight: { fontSize: 14, color: '#A3E4D7', textAlign: 'center' },
  cardTitleDark: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSubDark: { fontSize: 14, color: '#666' }
});