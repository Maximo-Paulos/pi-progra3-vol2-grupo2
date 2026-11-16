import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { auth, db } from '../firebase/config';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    function register() {
        setError('');
        
        
        if (username === '') {
            setError('El nombre de usuario es obligatorio.');
            return;
        }

        if (email === '') {
            setError('El email es obligatorio.');
            return;
        }

        if (password === '') {
            setError('La contraseña es obligatoria.');
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                return db.collection('users').add({
                    email: email,
                    username: username,
                });
            })
            .then(() => {
                return auth.signOut();
            })
            .catch((errorFirebase) => {
                setError('Error de Firebase: ' + errorFirebase);
            });
    }

    return (
        <View style={styles.container}>
            <Text>Registro</Text>

            <TextInput
                style={styles.field}
                placeholder="Nombre de usuario"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />

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

            <Pressable onPress={() => register()}>
                <Text>Registrarme</Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate('Login')}>
                <Text>Ya tengo cuenta. Iniciar sesión</Text>
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

export default Register;