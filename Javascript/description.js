import {
  get,
  ref,
  child,
  push,
  update,
  set,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { app, db, auth, loggedIn } from "/module.js";

// Constant variables used for API calls
const API_KEY = "ccde456b58f5587d49750d0077c801b3";
const API_CALL = "api_key=ccde456b58f5587d49750d0077c801b3";
const NORM_LINK = "https://api.themoviedb.org/3/";

function id_search(id) {
  let url = NORM_LINK + "movie/" + id + "?" + API_CALL + "&language=en-US";
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      displayInfo(data);
    });
}

function searchbar_search() {
  id_search(localStorage.getItem("search_id"));
}

function displayInfo(results) {
  if (results.overview == "") {
    document.getElementById("movie_description").innerHTML =
      "Summary not available!";
  } else {
    document.getElementById("movie_description").innerHTML =
      "Summary:" + " " + results.overview;
  }

  document.getElementById("movie_title").innerHTML = results.title;

  document.getElementById("movie_poster").src =
    "https://image.tmdb.org/t/p/w500/" + results.poster_path;
  document.getElementById("release_date").innerHTML =
    "Release Date: " + results.release_date;

  let movieDetails = {
    title: results.title,
    poster: "https://image.tmdb.org/t/p/w500/" + results.poster_path,
  };
  localStorage.setItem("this_movie", JSON.stringify(movieDetails));
}

function addToWatchlist() {
  let id = localStorage.getItem("search_id");
  if (localStorage.getItem("user_watchlist") == "") {
    localStorage.setItem("user_watchlist", id);
  } else {
    localStorage.setItem(
      "user_watchlist",
      localStorage.getItem("user_watchlist") + "*" + id
    );
  }

  let current_user = localStorage.getItem("CurrentUser");
  let watchlistRef = ref(db, "Users/" + current_user + "/watchlist");

  update(ref(db, "Users/" + current_user), {
    watchlist: localStorage.getItem("user_watchlist"),
  })
    .then(() => {
      alert("Added to Watchlist!");
    })
    .catch((error) => {
      alert(error);
    });
  location.reload();
}

function bookmarkMovie() {
  let id = localStorage.getItem("search_id");
  if (localStorage.getItem("user_bookmarks") == "") {
    localStorage.setItem("user_bookmarks", id);
  } else {
    localStorage.setItem(
      "user_bookmarks",
      localStorage.getItem("user_bookmarks") + "*" + id
    );
  }

  let current_user = localStorage.getItem("CurrentUser");
  let watchlistRef = ref(db, "Users/" + current_user + "/bookmarks");

  update(ref(db, "Users/" + current_user), {
    bookmarks: localStorage.getItem("user_bookmarks"),
  })
    .then(() => {
      alert("Bookmarked Movie!");
    })
    .catch((error) => {
      alert(error);
    });
  location.reload();
}

document.getElementById("saveButton").onclick = function () {
  addToWatchlist();
};

document.getElementById("bookmarkButton").onclick = function () {
  bookmarkMovie();
};

// FOR ALEX

function rateMovie() {
  let id = localStorage.getItem("search_id");
  let rating = parseInt(document.getElementById("rating").value);

  // Check if movie is in the user rated movies, if it is, show the rating and do not allow rate

  if (localStorage.getItem("user_ratedMovies").includes(id)) {
    alert("This movie has already been rated.");
  } else {
    localStorage.setItem(
      "user_ratedMovies",
      localStorage.getItem("user_ratedMovies") + id + "*"
    );
    // updates movie's rating
    const dbref = ref(db);
    get(child(dbref, "Movies/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(child(dbref, "Movies/" + id), {
            rating: (Number(snapshot.val().rating) + rating) / 2,
          }).catch((error) => {
            alert(error);
          });
        } else {
          set(ref(db, "Movies/" + id), {
            rating: rating,
          }).catch((error) => {
            alert(error);
          });
        }

        // updates user's rated movies
        update(ref(db, "Users/" + localStorage.getItem("CurrentUser")), {
          ratedMovies: localStorage.getItem("user_ratedMovies"),
        })
          .then(() => {
            alert("Movie has been rated!");
            location.reload();
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  }
}

document.getElementById("rate").onclick = function () {
  rateMovie();
};

function checkLogin() {
  let ratingForm = document.getElementById("ratingForm");
  let id = localStorage.getItem("search_id");

  if (
    localStorage.getItem("CurrentUser") === "" ||
    localStorage.getItem("CurrentUser") == null
  ) {
    ratingForm.innerHTML = "";
  } else if (localStorage.getItem("user_ratedMovies").includes(id)) {
    ratingForm.innerHTML = "You have already rated this movie.";
  }
}

window.onload = function () {
  searchbar_search();
  let id = localStorage.getItem("search_id");

  // checks if user is logged in and if so if they have rated the current movie
  checkLogin();
  
  // display current rating
  const dbref = ref(db);
  get(child(dbref, "Movies/" + id)).then((snapshot) => {
    if (snapshot.val() != null) {
      document.getElementById("displayRating").innerHTML =
        "Rating: " + Math.round(snapshot.val().rating * 10) / 10;
    } else {
      document.getElementById("displayRating").innerHTML = "Rating: None";
    }
  });
  
  if (
    localStorage.getItem("CurrentUser") != null &&
    localStorage.getItem("CurrentUser") != ""
  ) {
    let watchlist_array = localStorage.getItem("user_watchlist").split("*");
    let bookmark_array = localStorage.getItem("user_bookmarks").split("*");
    let saveButton = document.getElementById("saveButton");
    let savedButton = document.getElementById("saved");
    if (
      localStorage.getItem("CurrentUser") == "" ||
      localStorage.getItem("CurrentUser") == null || typeof(localStorage.getItem("CurrentUser")) === 'undefined' ||
      watchlist_array.includes(id)
    ) {
      saveButton.style.display = "none";
      savedButton.style.display = "block";
    } else {
      saveButton.style.display = "block";
      savedButton.style.display = "none";
    }

    let bookmarkButton = document.getElementById("bookmarkButton");
    let bookmarkedButton = document.getElementById("bookmarked");
    if (
      localStorage.getItem("CurrentUser") == "" ||
      localStorage.getItem("CurrentUser") == null || typeof(localStorage.getItem("CurrentUser")) === 'undefined' ||
      bookmark_array.includes(id)
    ) {
      bookmarkButton.style.display = "none";
      bookmarkedButton.style.display = "block";
    } else {
      bookmarkButton.style.display = "block";
      bookmarkedButton.style.display = "none";
    }
  }

};
