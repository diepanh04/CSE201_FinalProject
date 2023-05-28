// Constant variables used for API calls
const API_KEY = "ccde456b58f5587d49750d0077c801b3";
const API_CALL = "api_key=ccde456b58f5587d49750d0077c801b3";
const NORM_LINK = "https://api.themoviedb.org/3/";
const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
];

window.onload = function () {
  let genre = localStorage.getItem("genre");
  document.getElementById("search_info").innerHTML = genre;
  for (let i = 0; i < genres.length; i++) {
    if (genre == genres[i].name) {
      genreCall("" + genres[i].id);
    }
  }
};

function genreCall(genre) {
  let url =
    NORM_LINK +
    "discover/movie?" +
    API_CALL +
    "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
    genre +
    "&with_watch_monetization_types=flatrate";
  fetch(url)
    .then((result) => result.json())
    .then((data) => { 
      displayMovies(data.results);
    });
}

function displayMovies(results) {
  let j = 0;
  let checked_results = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i].poster_path == null || results[i].overview == "") {
      continue;
    } else {
      checked_results[j] = results[i];
      j += 1;
    }
  }

  if (checked_results.length < 15) {
    for (let i = 15; i > checked_results.length; i--) {
      document.getElementById("g" + i).style.display = "none";
      document.getElementById("land_caption" + i).style.display = "none";
    }
  }
  for (let i = 0; i < 15; i++) {
    document.getElementById("g" + (i + 1)).src =
      "https://image.tmdb.org/t/p/w500/" + checked_results[i].poster_path;
    document.getElementById("g" + (i + 1)).dataset.identifier =
      checked_results[i].title;
    document.getElementById("g" + (i+1)).dataset.id = checked_results[i].id; 
    document.getElementById("land_caption" + (i + 1)).innerHTML =
      checked_results[i].title;
  }
}

function clickedImage(id) {
  localStorage.setItem(
    "search_id",
    document.getElementById(id).dataset.id
  );
  window.location.href = "description.html";
}
