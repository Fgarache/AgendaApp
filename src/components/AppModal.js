import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Para respetar los botones del sistema
import ButtonFuncion from './ButtonFuncion';

const AppModal = ({ isVisible, title, message, onClose, buttonText }) => {
  const insets = useSafeAreaInsets(); // Detectamos el espacio de la barra de navegación inferior

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[
              styles.content, 
              // Añadimos un padding extra abajo para que el botón no choque con el sistema[cite: 1]
              { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 30 }
            ]}>
              {/* Una pequeña barra visual para indicar que se puede deslizar o cerrar */}
              <View style={styles.handle} />
              
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.msg}>{message}</Text>
              
              <View style={styles.buttonWrapper}>
                <ButtonFuncion title={buttonText} onPress={onClose} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end', // Empuja el contenido hacia abajo
  },
  content: {
    width: '100%',
    backgroundColor: '#fff',
    // Solo redondeamos las esquinas superiores para el efecto de "hoja"
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 15,
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  msg: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#666',
    lineHeight: 22,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
});

export default AppModal;