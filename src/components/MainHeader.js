import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import InfoButton from './InfoButton';

// El navegador nos pasará 'route' y 'options'
const MainHeader = ({ route, options }) => {
  // Extraemos los datos de ayuda que pusimos en la configuración
  const { helpTitle, helpMessage, helpButtonText } = options.helpData || {};

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* El título ahora viene de la pantalla actual */}
        <Text style={styles.title}>{options.title || route.name}</Text>
        
        <InfoButton 
          infoTitle={helpTitle}
          infoMessage={helpMessage}
          infoButtonText={helpButtonText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { backgroundColor: '#f8f8f8', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: 'bold' }
});

export default MainHeader;