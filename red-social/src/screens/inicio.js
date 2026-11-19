import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import Posteo from '../components/posteos';

function Inicio(props) {
  const [posteos, setPosteos] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let listaPosteos = [];
        docs.forEach(doc => {
          listaPosteos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosteos(listaPosteos);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posteos}
        renderItem={({ item }) => <Posteo posteo={item} navigation={props.navigation} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Inicio;