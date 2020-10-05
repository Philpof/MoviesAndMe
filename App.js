import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Search from './Components/Search'; // On peut aussi mettre le ".js" après "Search"

export default function App() {
  return (
    <View style={styles.container}>
      <Search/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cff3f3',
  },
});
