import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function Inicio() {
  return <Text>Inicio</Text>;
}

function Perfil() {
  return <Text>Perfil</Text>;
}

function NuevoPosteo() {
  return <Text>Nuevo posteo</Text>;
}

function NavegacionTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={Inicio} options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color="black" />
          )
        }}
      />

      <Tab.Screen name="Perfil" component={Perfil} options={{
          tabBarIcon: () => (
            <FontAwesome name="user" size={24} color="black" />
          )
        }}
      />

      <Tab.Screen name="Nuevo posteo" component={NuevoPosteo} options={{
          tabBarIcon: () => (
            <FontAwesome name="plus" size={24} color="black" />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default NavegacionTab;