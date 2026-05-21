import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { auth } from '../api/firebaseConfig';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

// Componentes propios
import ButtonFuncion from '../components/ButtonFuncion';
import AppModal from '../components/AppModal';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ visible: false, msg: "" });

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.expoConfig.extra.googleExpoClientId,
    iosClientId: Constants.expoConfig.extra.googleIosClientId,
    androidClientId: Constants.expoConfig.extra.googleAndroidClientId,
    webClientId: Constants.expoConfig.extra.googleWebClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      
      setLoading(true);
      signInWithCredential(auth, credential)
        .catch((error) => {
          setLoading(false);
          setErrorModal({ visible: true, msg: "Error al vincular con Firebase: " + error.message });
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      {/* Sección Superior: Branding */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logo.png')} // Asegúrate de tener tu logo aquí
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.brand}>Nicosoftweb</Text>
        <Text style={styles.tagline}>Tu agenda, organizada de forma inteligente.</Text>
      </View>

      {/* Sección Inferior: Acción */}
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <ButtonFuncion 
            title="Continuar con Google" 
            onPress={() => promptAsync()} 
            color="#DB4437" // Color corporativo de Google
          />
        )}
      </View>

      {/* Modal de error reutilizable */}
      <AppModal 
        isVisible={errorModal.visible}
        title="Error de Acceso"
        message={errorModal.msg}
        buttonText="Reintentar"
        onClose={() => setErrorModal({ visible: false, msg: "" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
