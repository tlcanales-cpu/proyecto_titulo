import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert('Debes usar un dispositivo físico para recibir notificaciones');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Permiso denegado para notificaciones');
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('🔔 Token de notificación:', token);
  return token;
}

// Opcional: configuración de comportamiento al recibir una notificación
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
