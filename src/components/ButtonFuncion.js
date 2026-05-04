import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonFuncion = ({ title, onPress, color = '#28a745' }) => (
  <TouchableOpacity style={[styles.btn, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.txt}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: { padding: 12, borderRadius: 10, minWidth: 100, alignItems: 'center' },
  txt: { color: '#fff', fontWeight: 'bold' }
});

export default ButtonFuncion;