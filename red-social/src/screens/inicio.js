import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { db } from '../firebase/config';
import Posteo from '../components/posteos';

function Inicio() {
  const [posteos, setPosteos] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs) => {
        const listaPosteos = [];

        docs.forEach((doc) => {
          listaPosteos.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setPosteos(listaPosteos);
      });
  }, []);

  return (
    <FlatList
      data={posteos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Posteo posteo={item} />}
    />
  );
}

export default Inicio;