import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, Platform, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { auth } from '../api/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Componentes propios
import AppModal from '../components/modal/AppModal';
import BottomSheetModal from '../components/modal/BottomSheetModal';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  // Estados para Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ visible: false, msg: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Estados para Registro
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Estado para Términos y Condiciones
  const [termsModalVisible, setTermsModalVisible] = useState(false);

  // Cargar credenciales guardadas si 'Recordarme' estaba activo
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const savedPassword = await SecureStore.getItemAsync('savedPassword');
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');
        
        if (savedRememberMe === 'true') {
          setRememberMe(true);
          if (savedEmail) setEmail(savedEmail);
          if (savedPassword) setPassword(savedPassword);
        }
      } catch (error) {
        console.log("Error al cargar credenciales:", error);
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      setErrorModal({ visible: true, msg: "Por favor ingresa correo y contraseña." });
      return;
    }
    
    setLoading(true);
    
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setLoading(false);
        
        // Guardar o limpiar credenciales dependiendo del switch
        try {
          if (rememberMe) {
            await AsyncStorage.setItem('savedEmail', email);
            await SecureStore.setItemAsync('savedPassword', password);
            await AsyncStorage.setItem('rememberMe', 'true');
          } else {
            await AsyncStorage.removeItem('savedEmail');
            await SecureStore.deleteItemAsync('savedPassword');
            await AsyncStorage.setItem('rememberMe', 'false');
          }
        } catch (error) {
          console.log("Error al guardar credenciales:", error);
        }

        try {
          navigation.replace('Main');
        } catch (navError) {
          navigation.navigate('Main');
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorModal({ visible: true, msg: "Error en credenciales. Verifica tu correo y contraseña." });
      });
  };

  const handleRegister = () => {
    if (!regEmail || !regPassword) {
      setErrorModal({ visible: true, msg: "Por favor ingresa correo y contraseña para registrarte." });
      return;
    }
    setRegLoading(true);
    createUserWithEmailAndPassword(auth, regEmail, regPassword)
      .then(() => {
        setRegLoading(false);
        setRegisterModalVisible(false);
        // Firebase iniciará sesión automáticamente después de registrar
        try {
          navigation.replace('Main');
        } catch (navError) {
          navigation.navigate('Main');
        }
      })
      .catch((error) => {
        setRegLoading(false);
        let errorMsg = "No se pudo crear la cuenta. Verifica los datos.";
        if (error.code === 'auth/email-already-in-use') {
          errorMsg = "Este correo ya está registrado.";
        } else if (error.code === 'auth/weak-password') {
          errorMsg = "La contraseña debe tener al menos 6 caracteres.";
        } else if (error.code === 'auth/invalid-email') {
          errorMsg = "El formato del correo es inválido.";
        }
        setErrorModal({ visible: true, msg: errorMsg });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Círculo decorativo de fondo */}
          <View style={styles.backgroundCircle} />

          <View style={styles.content}>
            {/* Sección Superior: Branding */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../../assets/logo.png')}
                  style={styles.logo} 
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.brand}>APS</Text>
              <Text style={styles.tagline}>Tu APS, organizadate de forma inteligente y rápida.</Text>
            </View>

            {/* Sección Media: Formulario */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Contraseña"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword} 
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  style={styles.showPasswordButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.showPasswordText}>{showPassword ? "Ocultar" : "Ver"}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rememberMeContainer}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: "#D1D5DB", true: "#4F46E5" }}
                  thumbColor="#FFFFFF"
                />
                <Text style={styles.rememberMeText}>Recordarme</Text>
              </View>
            </View>

            {/* Sección Inferior: Acción */}
            <View style={styles.footer}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#4F46E5" />
                  <Text style={styles.loadingText}>Procesando...</Text>
                </View>
              ) : (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity 
                    style={styles.primaryButton} 
                    onPress={handleLogin}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.secondaryButton} 
                    onPress={() => {
                      setRegEmail('');
                      setRegPassword('');
                      setRegisterModalVisible(true);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.secondaryButtonText}>Crear una cuenta nueva</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity onPress={() => setTermsModalVisible(true)} activeOpacity={0.7}>
                <Text style={styles.termsText}>
                  Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de Registro Reutilizable */}
      <BottomSheetModal
        isVisible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
        title="Crear Cuenta"
        subtitle="Ingresa tus datos para registrarte"
      >
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#9CA3AF"
          value={regEmail}
          onChangeText={setRegEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#9CA3AF"
          value={regPassword}
          onChangeText={setRegPassword}
          secureTextEntry
        />
        
        {regLoading ? (
          <ActivityIndicator size="large" color="#4F46E5" style={{ marginVertical: 10 }} />
        ) : (
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Registrarme</Text>
          </TouchableOpacity>
        )}
      </BottomSheetModal>

      {/* Modal de Términos Reutilizable */}
      <BottomSheetModal
        isVisible={termsModalVisible}
        onClose={() => setTermsModalVisible(false)}
        title="Términos y Privacidad"
      >
        <ScrollView style={styles.termsScrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.termsContentText}>
            1. Uso de la aplicación.{"\n"}
            Al utilizar esta aplicación, aceptas que la información proporcionada es para uso exclusivo de Nicosoftweb y la gestión de tu agenda personal.{"\n\n"}
            2. Privacidad de datos.{"\n"}
            Tus datos de acceso y la información de la agenda están protegidos y no serán compartidos con terceros sin tu consentimiento explícito.{"\n\n"}
            3. Responsabilidad.{"\n"}
            El uso de la aplicación es responsabilidad del usuario. Nicosoftweb no se hace responsable por pérdida de datos derivada del mal uso del dispositivo.
          </Text>
        </ScrollView>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => setTermsModalVisible(false)}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Entendido</Text>
        </TouchableOpacity>
      </BottomSheetModal>

      {/* Modal de error reutilizable */}
      <AppModal 
        isVisible={errorModal.visible}
        title="Atención"
        message={errorModal.msg}
        buttonText="Aceptar"
        onClose={() => setErrorModal({ visible: false, msg: "" })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backgroundCircle: {
    position: 'absolute',
    top: -width * 0.4,
    right: -width * 0.2,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: '#E8F0FE',
    opacity: 0.7,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingVertical: 20,
    minHeight: Dimensions.get('window').height - 100, 
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 24,
  },
  logo: {
    width: 70,
    height: 70,
  },
  brand: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    fontSize: 16,
    color: '#374151',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  termsText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
    textDecorationLine: 'underline',
  },
  termsScrollView: {
    maxHeight: 250,
    marginBottom: 20,
  },
  termsContentText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    textAlign: 'justify',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 0,
    marginBottom: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  showPasswordButton: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  showPasswordText: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 14,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4B5563',
  },
});