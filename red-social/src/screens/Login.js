import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { auth } from '../firebase/config';

function Login(props) {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function login() {
    setError('');

    if (email === '') {
      setError('El email es obligatorio.');
      return;
    }

    if (password === '') {
      setError('La contraseña es obligatoria.');
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .catch((errorFirebase) => {
        setError('Error de Firebase: ' + errorFirebase);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>

      <TextInput
        style={styles.field}
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.field}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      {error !== '' && <Text>{error}</Text>}

      <Pressable onPress={() => login()}>
        <Text>Iniciar sesión</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('Register')}>
        <Text>Crear una cuenta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  field: {
    borderWidth: 1,
    marginTop: 12,
    padding: 10,
  },
});

export default Login;
