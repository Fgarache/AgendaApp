import AgendaScreen from '../screens/AgendaScreen';
import PerfilScreen from '../screens/PerfilScreen';

export const screensConfig = [
  {
    name: 'Agenda',
    component: AgendaScreen,
    icon: 'calendar',
    label: 'Agenda',
    // Datos dinámicos para el Header y el Botón de Ayuda
    helpTitle: 'Ayuda: Agenda',
    helpMessage: 'Tu agenda privada organizada por días y horarios. Aquí puedes gestionar todos tus tours.',
    helpButtonText: 'Entendido'
  },
  {
    name: 'Perfil',
    component: PerfilScreen,
    icon: 'person',
    label: 'Perfil',
    // Datos dinámicos para el Header y el Botón de Ayuda
    helpTitle: 'Configuración de Perfil',
    helpMessage: 'Aquí puedes actualizar tus datos personales, cambiar tu foto y gestionar tu cuenta.',
    helpButtonText: 'Aceptar'
  },
];