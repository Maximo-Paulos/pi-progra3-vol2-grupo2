import { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Perfil(props) {
  const [usuarios, setUsuarios] = useState([]);
  const [posteos, setPosteos] = useState([]);

  useEffect(() => {
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let lista = [];
        docs.forEach(doc => {
          lista.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setUsuarios(lista);
      });

    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        let lista = [];
        docs.forEach(doc => {
          lista.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosteos(lista);
      });
  }, []);

  function cerrarSesion() {
    auth.signOut();
    props.navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <FlatList
        data={usuarios}
        renderItem={({ item }) => <Text>Usuario: {item.data.username}</Text>}
      />
      <Text>Email: {auth.currentUser.email}</Text>
      <Text style={styles.subtitle}>Mis posteos</Text>
      <FlatList
        data={posteos}
        renderItem={({ item }) => <Text style={styles.posteo}>{item.data.description}</Text>}
      />
      <Pressable style={styles.button} onPress={() => cerrarSesion()}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
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
  subtitle: {
    fontSize: 18,
    marginTop: 20,
  },
  posteo: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginVertical: 5,
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
