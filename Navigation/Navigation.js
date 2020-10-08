import React from 'react' // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image !
import { StyleSheet, Image } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Search from '../Components/Search.js'
import FilmDetail from '../Components/FilmDetail.js'
import Favorites from '../Components/Favorites'
import Credits from '../Components/Credits'

const SearchStackNavigator = createStackNavigator({
  Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: 'Recherche'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détail'
    }
  },
  // Favorites: {
  //   screen: Favorites,
  //   navigationOptions: {
  //     title: 'Favoris'
  //   }
  // },
  // Credits: {
  //   screen: Credits,
  //   navigationOptions: {
  //     title: 'Crédits'
  //   }
  // }
})

const MoviesTabNavigator = createBottomTabNavigator(
{
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
        return <Image
          source={require('../Images/ic_search.png')}
          style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
      }
    }
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/ic_favorite.png')}
          style={styles.icon}/>
      }
    }
  },
  Credits: {
    screen: Credits,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/ic_credits.png')}
          style={styles.icon}/>
      }
    }
  }
},

{
  tabBarOptions: {
    activeBackgroundColor: '#FFFF00', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan des onglets non sélectionnés
    showLabel: false, // On masque les titres
    showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
  }
}

)

const styles = StyleSheet.create({
  icon: {
  width: 30,
  height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)
