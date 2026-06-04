import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ButtonFuncion from '../ButtonFuncion';
import './AppModal.css';

const AppModal = ({ isVisible, title, message, onClose, buttonText }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <TouchableWithoutFeedback>
            <View style={[
              {
                width: '100%',
                backgroundColor: '#fff',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                paddingHorizontal: 25,
                paddingTop: 15,
                alignItems: 'center',
                boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.1)',
                paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 30
              }
            ]}>
              <View style={{ width: 40, height: 5, backgroundColor: '#ccc', borderRadius: 3, marginBottom: 20 }} />
              
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>{title}</Text>
              <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 25, color: '#666', lineHeight: 22 }}>{message}</Text>
              
              <View style={{ width: '100%', alignItems: 'center' }}>
                <ButtonFuncion title={buttonText} onPress={onClose} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AppModal;