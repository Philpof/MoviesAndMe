import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi.js';

class FilmItem extends React.Component {
  render() {
    const { film, displayDetailForFilm } = this.props
    // Cela équivaut à :
    // const film = this.props.film
    // const displayDetailForFilm = this.props.displayDetailForFilm
    return (
      <TouchableOpacity
        style={styles.main}
        onPress={() => displayDetailForFilm(film.id)}
      >
          <Image style={styles.poster} source={{uri: getImageFromApi(film.poster_path)}}/>
          <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>{film.title}</Text>
                <Text style={styles.vote}>{film.vote_average}</Text>
              </View>
              <Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
              <Text style={styles.date}>Sorti le {film.release_date}</Text>
          </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    height: 200,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  poster: {
    width: 126,
    height: 189,
    margin: 5,
    backgroundColor: 'grey'
  },
  container: {
    flex: 2,
    flexDirection: 'column',
    margin: 5,
  },
  header: {
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    flex: 4,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'top',
  },
  vote: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 5,
    textAlignVertical: 'center'
  },
  description: {
    flex: 3,
    fontStyle: 'italic',
    textAlignVertical: 'center',
  },
  date: {
    flex: 1,
    textAlign: 'right',
    marginRight: 5,
    textAlignVertical: 'center',
  }
})

export default FilmItem
