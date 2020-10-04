import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './Components/Search'; // On peut aussi mettre le ".js" après "Search"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Nouvelle application faites par moi !</Text>
      <Search/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
