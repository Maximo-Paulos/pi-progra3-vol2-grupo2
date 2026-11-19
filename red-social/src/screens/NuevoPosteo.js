import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../firebase/config';

function NuevoPosteo() {
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');

    function publicarPosteo() {
        if (descripcion.length === 0) {
            setMensaje('Escribí una descripción');
        } else {
            db.collection('posts').add({
                owner: auth.currentUser.email,
                description: descripcion,
                createdAt: Date.now(),
                likes: [],
            })
                .then(() => {
                    setDescripcion('');
                    setMensaje('Posteo publicado');
                })
                .catch(e => console.log(e));
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear nuevo post</Text>

            <TextInput
                style={styles.field}
                placeholder="Escribí tu post"
                onChangeText={(texto) => setDescripcion(texto)}
                value={descripcion}
            />

            <Text style={styles.message}>{mensaje}</Text>

            <Pressable
                style={styles.button}
                onPress={() => publicarPosteo()}
            >
                <Text style={styles.buttonText}>Publicar post</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f7f5f0',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    field: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 12,
        marginBottom: 14,
        backgroundColor: '#ffffff',
    },
    message: {
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#9bdcf5',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
    },
});


export default NuevoPosteo;