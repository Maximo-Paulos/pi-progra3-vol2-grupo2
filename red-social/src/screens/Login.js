import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('HomeMenu');
      }
    });
  });

  function onSubmit() {
    if (email.length === 0) {
      setLoginError('El email es obligatorio');
    } else if (password.length === 0) {
      setLoginError('La password es obligatoria');
    } else {
      auth.signInWithEmailAndPassword(email, password)
        .then(response => {
          props.navigation.navigate('HomeMenu');
        })
        .catch(error => {
          setLoginError('Credenciales incorrectas');
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.field}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text => setEmail(text)}
        value={email} />
      <TextInput style={styles.field}
        keyboardType='default'
        placeholder='password'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password} />
      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
      <Text>{loginError}</Text>
      <Pressable onPress={() => props.navigation.navigate('Register')}>
        <Text>¿No tenés cuenta? Registrate</Text>
      </Pressable>
    </View>
  );
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

export default Login;