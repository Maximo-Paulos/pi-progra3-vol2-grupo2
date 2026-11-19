import firebase from 'firebase';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Posteo(props) {
  const likeado = props.posteo.data.likes.includes(auth.currentUser.email);


  function like() {
    db.collection('posts')
      .doc(props.posteo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(() => {
      });
  }

  function quitarLike() {
    db.collection('posts')
      .doc(props.posteo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(() => {
      });
  }

  return (
    <View style={styles.card}>
      <Text style={styles.owner}>{props.posteo.data.owner}</Text>
      <Text style={styles.description}>{props.posteo.data.description}</Text>
      <Text style={styles.likes}>Likes: {props.posteo.data.likes.length}</Text>
      {likeado ?
        <Pressable onPress={() => quitarLike()}>
          <Text>Me gusta</Text>
        </Pressable>
        :
        <Pressable onPress={() => like()}>
          <Text>Me gusta</Text>
        </Pressable>
      }
      <Pressable onPress={() => props.navigation.navigate('Comentarios', { idPosteo: props.posteo.id })}>
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
