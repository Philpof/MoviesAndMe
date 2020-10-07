import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from './Navigation/Navigation.js'; // On peut aussi ne pas mettre le ".js" après "Navigation"
import { Provider } from 'react-redux';
import Store from './Store/configureStore.js';

export default function App() {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Provider store={Store}><Navigation/></Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cff3f3',
  },
});
