import React from 'react';
import { Text, Pressable, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../firebase/config';



function Perfil() {
  
function CerrarSesion() {
  auth.signOut();
}

    return (
    <React.Fragment>
            <Text>Perfil</Text>
            <Pressable style={styles.button} onPress={() => CerrarSesion()}>
        <Text style={styles.buttonText}>Cerrar sesion</Text>
      </Pressable>
          </React.Fragment>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
  },
  field: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
export default Perfil;
