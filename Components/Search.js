import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button, View, TextInput, Text } from 'react-native';
import FilmItem from './FilmItem.js';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js

class Search extends Component { // class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: [],
      isLoading: false,
    }
    this.searchedText = "",
    this.page = 0,
    this.totalPages = 0
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({isLoading: true})
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page,
        this.totalPages = data.total_pages,
        this.setState({
          films: this.state.films.concat(data.results), // Permet d'ajouter des films à la liste et de ne pas écraser la liste précédente.
          isLoading: false
        })
      })
    }
  }

  _searchTextIputChanged(text) {
    this.searchedText = text
  }

  _searchFilms() {
    // Ici on va remettre à zéro les films de notre state
    this.page = 0,
    this.totalPages = 0
    this.setState(
      { films: [] },
      () => { // permet d'exécuter une action dès que notre state a fini de se mettre à jour.
        // On appel _loadFilms qui reste une fonction qu'on peut appeler après pour aficher les pages suivantes sinon tout se remet à zéro
        this._loadFilms()
      }
    )
  }

// Externalisation de la fonction qui ne doit contenir que des éléments de rendu. C'est mieux de l'externaliser que de l'incorporer directement dans le "return" du "render" principal
  _displayLoading () {
    if (this.state.isLoading) {
      return (
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )
    }
  }

  _displayDetailForFilm = (idFilm) => {
  this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

  render() { // render = function() {
    return (
      <View style={styles.view}>

        <TextInput
          placeholder="Titre du film recherché"
          style={styles.textInput}
          onChangeText={text => this._searchTextIputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />

        <Button
          title="Rechercher"
          onPress={() => this._searchFilms()}
          color= "red"
          accessibilityLabel="Rechercher"
        />

        <FlatList
          style={styles.flatList}
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()} // "toString()" pour convertir notre identifiant de film en chaîne de caractères.
          renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadFilms()
            }
          }}
        />

        {this._displayLoading()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
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

  flatList: {
    marginTop: 2,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: 'black'
  },
  viewLoading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Search;
