import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Comentarios(props) {
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    db.collection('comments')
      .where('idPosteo', '==', props.route.params.idPosteo)
      .onSnapshot(docs => {
        let lista = [];
        docs.forEach(doc => {
          lista.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setComentarios(lista);
      });
  }, []);

  function onSubmit() {
    db.collection('comments').add({
      idPosteo: props.route.params.idPosteo,
      owner: auth.currentUser.email,
      texto: comentario,
      createdAt: Date.now(),
    })
      .then(() => {
        setComentario('');
      })
      .catch(e => console.log(e));
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Comentarios</Text>
      <View style={ styles.posteo }>
        <Text style={ styles.owner }>{ props.route.params.posteo.owner }</Text>
        <Text style={ styles.description }>{ props.route.params.posteo.description }</Text>
      </View>   
      <FlatList
        data={ comentarios }
        renderItem={ ({ item }) => <Text>{ item.data.owner }: { item.data.texto }</Text> }
      />
      <TextInput style={ styles.field }
        keyboardType='default'
        placeholder='Escribí un comentario'
        onChangeText={ text => setComentario(text) }
        value={ comentario } />
      <Pressable style={ styles.button } onPress={ () => onSubmit() }>
        <Text style={ styles.buttonText }>Comentar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
  },
  posteo: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 12,
    padding: 14,
    marginVertical: 12,
  },
  owner: {
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
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

export default Comentarios;