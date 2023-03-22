/*global Papa*/

// Constant variables used for API calls
const API_KEY = "ccde456b58f5587d49750d0077c801b3";
const API_CALL = "api_key=ccde456b58f5587d49750d0077c801b3";
const NORM_LINK = "https://api.themoviedb.org/3/";

getNewReleases();

function getNewReleases() {
  let url =
    "https://api.themoviedb.org/3/movie/now_playing?" +
    API_CALL +
    "&language=en-US&page=1";
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      displayNewReleases(data.results);
    });
}

function displayNewReleases(results) {
  document.getElementById("pic1").src =
    "https://image.tmdb.org/t/p/w500/" + results[0].poster_path;
  document.getElementById("pic1").dataset.identifier = results[0].title;
  document.getElementById("pic2").src =
    "https://image.tmdb.org/t/p/w500/" + results[1].poster_path;
  document.getElementById("pic2").dataset.identifier = results[1].title;
  document.getElementById("pic3").src =
    "https://image.tmdb.org/t/p/w500/" + results[2].poster_path;
  document.getElementById("pic3").dataset.identifier = results[2].title;
  document.getElementById("pic4").src =
    "https://image.tmdb.org/t/p/w500/" + results[3].poster_path;
  document.getElementById("pic4").dataset.identifier = results[3].title;
  document.getElementById("pic5").src =
    "https://image.tmdb.org/t/p/w500/" + results[4].poster_path;
  document.getElementById("pic5").dataset.identifier = results[4].title;
}

function clickedImage(id) {
  localStorage.setItem(
    "search_term",
    document.getElementById(id).dataset.identifier
  );
  window.location.href = "description.html";
}

// Search that will match a specific movie, only will give one result

function storeItem() {
  let inp = document.getElementById("search_bar").value;
  localStorage.setItem("search_term", inp);
  window.location.href = "description.html";
}

// html block for individual movie
