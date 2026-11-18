import { StyleSheet, Text, View } from 'react-native';

function Comentarios() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios</Text>
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
});

export default Comentarios;