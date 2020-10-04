import React, { Component } from 'react'; // import React from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';

class Search extends Component { // class Search extends React.Component {
  render() { // render = function() {
    return (
      <View>
        <TextInput placeholder="Titre du Film" style={styles.textInput}/>
        <Button title="Rechercher" onPress={() => {}} color='green'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
    marginBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default Search;
