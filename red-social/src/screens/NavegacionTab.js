import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';


import Perfil from './perfil';
import NuevoPosteo from './NuevoPosteo';
import Inicio from './inicio';
import Comentarios from './Comentarios';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function InicioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Inicio} />
      <Stack.Screen name="Comentarios" component={Comentarios} />
    </Stack.Navigator>
  );
}

function NavegacionTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Nuevo posteo"
        component={NuevoPosteo}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="plus" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default NavegacionTab;
