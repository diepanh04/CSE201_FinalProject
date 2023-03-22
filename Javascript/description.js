// Constant variables used for API calls
const API_KEY = "ccde456b58f5587d49750d0077c801b3";
const API_CALL = "api_key=ccde456b58f5587d49750d0077c801b3";
const NORM_LINK = "https://api.themoviedb.org/3/";

function specific_search(key) {
  let url = NORM_LINK + "search/movie?" + API_CALL + "&query=" + key;
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      displayInfo(data.results);
    });
}

function searchbar_search() {
  let term = localStorage.getItem("search_term");
  specific_search(term);
}

function displayInfo(results) {
  const greetingValue = localStorage.getItem("search_term");
  document.getElementById("movie_title").innerHTML = results[0].title;
  document.getElementById("movie_description").innerHTML =
    "Summary: " + results[0].overview;
  document.getElementById("movie_poster").src =
    "https://image.tmdb.org/t/p/w500/" + results[0].poster_path;
}
