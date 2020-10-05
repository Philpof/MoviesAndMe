import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

class FilmItem extends React.Component {
  render() {
    const film = this.props.film
    return (
      <View style={styles.main}>
        <Image style={styles.poster} source={{uri: "image"}}/>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{film.title}</Text>
            <Text style={styles.vote}>{film.vote_average}</Text>
          </View>
          <Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
          <Text style={styles.date}>Sorti le {film.release_date}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    height: 200,
  },
  poster: {
    flex: 1,
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
    textAlignVertical: 'bottom',
  }
})

export default FilmItem
