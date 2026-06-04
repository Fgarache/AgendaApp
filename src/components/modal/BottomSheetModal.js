import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import './BottomSheetModal.css';

const BottomSheetModal = ({ isVisible, onClose, title, subtitle, children }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal 
      visible={isVisible} 
      transparent 
      animationType="slide" 
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        
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
            maxHeight: '90%',
            paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 30
          }
        ]}>
          <View style={{ width: 40, height: 5, backgroundColor: '#ccc', borderRadius: 3, marginBottom: 20 }} />
          
          {title && <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1F2937', marginBottom: 5, textAlign: 'center' }}>{title}</Text>}
          {subtitle && <Text style={{ fontSize: 15, color: '#6B7280', marginBottom: 20, textAlign: 'center' }}>{subtitle}</Text>}
          
          <View style={{ width: '100%' }}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheetModal;