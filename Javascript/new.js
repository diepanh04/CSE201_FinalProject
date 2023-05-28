//import { loggedIn } from "/module.js";
// Constant variables used for API calls
const API_KEY = "ccde456b58f5587d49750d0077c801b3";
const API_CALL = "api_key=ccde456b58f5587d49750d0077c801b3";
const NORM_LINK = "https://api.themoviedb.org/3/";

window.onload = function() {
  getNewReleases();
  if (localStorage.getItem("CurrentUser") != null && localStorage.getItem("CurrentUser") != "") {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block"; 
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none"; 
    document.getElementById("watchlist").style.display = "none"; 
    document.getElementById("bookmark").style.display = "none";
  }
}

function getNewReleases() {
  let url =
    "https://api.themoviedb.org/3/movie/now_playing?" +
    API_CALL +
    "&language=en-US&page=1";
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      displayNewReleases(data.results);
    });
}

function displayNewReleases(results) {
  for (let i = 0; i < 5; i++) {
    document.getElementById("pic" + (i + 1)).src =
      "https://image.tmdb.org/t/p/w500/" + results[i].poster_path;
    document.getElementById("pic" + (i + 1)).dataset.identifier =
      results[i].title;
    document.getElementById("pic" + (i + 1)).dataset.id = results[i].id;
  } 
}

function clickedImage(id) {
  localStorage.setItem("search_id", document.getElementById(id).dataset.id);
  window.location.href = "description.html";
}

// Search that will match a specific movie, only will give one result

function storeItem() {
  let inp = document.getElementById("search_bar").value;
  localStorage.setItem("search_term", inp);
  window.location.href = "search_landing.html";
}

function setGenre(genre) {
  localStorage.setItem("genre", genre);
}

function logout(){
  localStorage.clear();
  localStorage.setItem("CurrentUser", ""); 
  
  window.location.href = "index.html";
}

document
  .getElementById("search_bar")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.getElementById("search_button").click();
    }
  });


