import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Alert } from 'react-native';
import InfoButton from './InfoButton';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../api/firebaseConfig';
import { signOut } from 'firebase/auth';

// El navegador nos pasará 'route', 'options' y 'navigation'
const MainHeader = ({ route, options, navigation }) => {
  // Extraemos los datos de ayuda que pusimos en la configuración
  const { helpTitle, helpMessage, helpButtonText } = options.helpData || {};

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, salir", 
          style: "destructive",
          onPress: () => {
            signOut(auth)
              .then(() => {
                navigation.replace('Login');
              })
              .catch((error) => {
                console.error("Error al cerrar sesión:", error);
              });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* El título ahora viene de la pantalla actual */}
        <Text style={styles.title}>{options.title || route.name}</Text>
        
        <View style={styles.rightContainer}>
          {route.name === 'Perfil' && (
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={26} color="#FF3B30" />
            </TouchableOpacity>
          )}
          <InfoButton 
            infoTitle={helpTitle}
            infoMessage={helpMessage}
            infoButtonText={helpButtonText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { backgroundColor: '#f8f8f8', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  rightContainer: { flexDirection: 'row', alignItems: 'center' },
  logoutButton: { marginRight: 15 }
});

export default MainHeader;