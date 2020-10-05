import React, { Component } from 'react';
import { FlatList, StyleSheet, Button, View, TextInput, Text } from 'react-native';
import FilmItem from './FilmItem.js';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js

class Search extends Component { // class Search extends React.Component {

  constructor(props) {
    super(props)
    this._films = []
  }

  _loadFilms() {
    getFilmsFromApiWithSearchedText("star").then(data => {
      this._films = data.results
      this.forceUpdate()
    })
  }

  render() { // render = function() {
    return (
      <View style={styles.view}>
        <TextInput placeholder="Titre du Film" style={styles.textInput}/>
        <Button title="Rechercher" onPress={() => this._loadFilms()} style={styles.button}/>

        <FlatList
          data={this._films}
          keyExtractor={(item) => item.id.toString()} // "toString()" pour convertir notre identifiant de film en chaîne de caractères.
          renderItem={({item}) => <FilmItem film={item}/>}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 20,
  },

  textInput: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    margin: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },

  button:{
    color: '#fd5400',
    height: 50,
  }
});

export default Search;
