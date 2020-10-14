import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button, View, TextInput, Text } from 'react-native';
import FilmItem from './FilmItem.js';
import FilmList from './FilmList.js';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js

class Search extends Component { // class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: [],
      isLoading: false,
    }
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this._loadFilms = this._loadFilms.bind(this)
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
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
    this.setState({
        films: [],
      }, () => { // permet d'exécuter une action dès que notre state a fini de se mettre à jour.
        // On appel _loadFilms qui reste une fonction qu'on peut appeler après pour aficher les pages suivantes sinon tout se remet à zéro
        this._loadFilms()
      }
    )
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
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

        <FilmList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
          favoriteList={false}
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
