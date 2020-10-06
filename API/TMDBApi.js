const API_TOKEN = "32fd736b7cb8bfd402678095045d933c";

export function getFilmsFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

// Pour faire apparaitre les posters des films avec une width de 300
export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}
