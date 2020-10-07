import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true, // A l'ouverture de la vue, on affiche le chargement pendant le chargement du film
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => { // (this.props.navigation.state.params.idFilm) : l'info est prise en faisant 'console.log(this.props.navigation)' et en regardant le chemain où se situs 'idFilm'
      this.setState({
        film: data,
        isLoading: false,
      })
    })
  }


  _displayLoading () {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )
    }
  }

  _displayFilm() {
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image style={styles.image} source={{uri: getImageFromApi(this.state.film.backdrop_path)}}/>
          <Text style={styles.title_text}>{this.state.film.title}</Text>
          <Text style={styles.description_text}>{this.state.film.overview}</Text>
          <Text style={styles.default_text}>Genre : {this.state.film.genres.map(function(genre){
              return genre.name;
            }).join(", ")}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(this.state.film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>VO : {this.state.film.original_language}</Text>
          <Text style={styles.default_text}>Companie(s) : {this.state.film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}</Text>
          <Text style={styles.default_text}>Budget : {numeral(this.state.film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Note : {this.state.film.vote_average}</Text>
          <Text style={styles.default_text}>Nombre de votes : {this.state.film.vote_count}</Text>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

export default FilmDetail
