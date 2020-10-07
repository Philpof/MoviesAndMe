const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) { // Dans une action, il y a le "type" et la "value" donc on a "action.type" et " action.value". La "value" peut-être vide
  let nextState

  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id) // la fonction  "findIndex"  en Javascript retourne l'index de l'élément dans le tableau s'il existe, sinon elle renvoie -1
      if (favoriteFilmIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state, // les 3 points "..." permettent de faire une copie, ici, du state. Copier le "state" dans le "nextState" permet de conserver les autres valeurs du "state" et de ne pas tout supprimer
          favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        }
      }
      return nextState || state // renvoi "nextState" s'il n'est pas "undefined" sinon renvoi "state"

  default:
    return state
  }
}

export default toggleFavorite
