import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class FilmDetail extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Text>Détail du film {this.props.navigation.state.params.idFilm}</Text> { /* l'info est prise en faisant 'console.log(this.props.navigation)' et en regardant le chemain où se situs 'idFilm' */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
})

export default FilmDetail
