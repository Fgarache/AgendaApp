import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import AppModal from './modal/AppModal';

const InfoButton = ({ infoTitle, infoMessage, infoButtonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.circle} onPress={() => setIsOpen(true)}>
        <Text style={styles.text}>?</Text>
      </TouchableOpacity>

      <AppModal 
        isVisible={isOpen}
        title={infoTitle}
        message={infoMessage}
        buttonText={infoButtonText} // Enviamos el texto del botón al modal[cite: 1]
        onClose={() => setIsOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: { backgroundColor: '#007AFF', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});

export default InfoButton;