import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebase/config';

function Posteo(props) {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const likes = props.posteo.data.likes || [];
  const cantidadLikes = likes.length;
  let usuarioYaDioLike = false;

  useEffect(() => {
    db.collection('users')
      .where('email', '==', props.posteo.data.owner)
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          setNombreUsuario(doc.data().username);
        });
      });
  }, []);

  likes.forEach((email) => {
    if (email === auth.currentUser.email) {
      usuarioYaDioLike = true;
    }
  });

  function actualizarLike() {
    const cambioLike = usuarioYaDioLike
      ? firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      : firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email);

    db.collection('posts')
      .doc(props.posteo.id)
      .update({ likes: cambioLike })
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.card}>
      <Text style={styles.owner}>
        {nombreUsuario || 'Cargando usuario...'}
      </Text>

      <Text style={styles.description}>
        {props.posteo.data.description}
      </Text>

      <Pressable onPress={() => actualizarLike()}>
        <Text style={styles.likes}>
          {usuarioYaDioLike ? '♥' : '♡'} {cantidadLikes} likes
        </Text>
      </Pressable>


      <Pressable
        onPress={() =>
          props.navigation.navigate('Comentarios', {
            idPosteo: props.posteo.id,
          })
        }
      >
        <Text>Comentar</Text>
      </Pressable>
    </View>

  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  owner: {
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  likes: {
    fontSize: 14,
  },
});

export default Posteo;
