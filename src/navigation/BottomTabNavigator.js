import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { screensConfig } from './navigationConfig';
import MainHeader from '../components/MainHeader'; // Importar el header[cite: 1]

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Usamos nuestro componente personalizado para el header[cite: 1]
        header: (props) => <MainHeader {...props} />,
        tabBarIcon: ({ focused, color, size }) => {
          const screen = screensConfig.find(s => s.name === route.name);
          const iconName = focused ? screen.icon : `${screen.icon}-outline`;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {screensConfig.map((screen) => (
        <Tab.Screen 
          key={screen.name}
          name={screen.name} 
          component={screen.component} 
          options={{ 
            title: screen.label,
            // Pasamos los datos de ayuda a través de 'options'[cite: 1]
            helpData: {
              helpTitle: screen.helpTitle,
              helpMessage: screen.helpMessage,
              helpButtonText: screen.helpButtonText
            }
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;