import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { get, ref, child, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { app, db, auth, loggedIn } from "/module.js";

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      var ldate = new Date();
      update(ref(db, "Users/" + user.uid), {
        last_login: ldate,
        
      })
        .then(() => {
          localStorage.setItem("CurrentUser", user.uid);
          alert("Successful Login!");
          store_userdata();
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function store_userdata() {
  let current_user = localStorage.getItem("CurrentUser");
  const dbref = ref(db);

  get(child(dbref, "Users/" + current_user))
    .then((snapshot) => {
      if (snapshot.exists()) {
        localStorage.setItem("user_watchlist", snapshot.val().watchlist);
        localStorage.setItem("user_ratedMovies", snapshot.val().ratedMovies);
        localStorage.setItem("user_bookmarks", snapshot.val().bookmarks); 
      } else {
        alert("Error with watchlist retrieval");
      }
    })
    .catch((error) => {
      alert(error);
    });
}

document.getElementById("log").onclick = function () {
  login();
};
