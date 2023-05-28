import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCyRY4XWe4Fgkws99aaBJA73Ks8phyXz-s",
  authDomain: "projectmovies-604d7.firebaseapp.com",
  databaseURL: "https://projectmovies-604d7-default-rtdb.firebaseio.com",
  projectId: "projectmovies-604d7",
  storageBucket: "projectmovies-604d7.appspot.com",
  messagingSenderId: "26799173977",
  appId: "1:26799173977:web:8b5b72f683dbc094a7dc48",
  measurementId: "G-MHQG7M8JY4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Check if user is logged in
function loggedIn(userId) {
  const dbref = ref(db);
  return get(child(dbref, "Users/" + userId + "/last_login")).then(
    (snapshot) => {
      if (snapshot.exist()) return true;
      else return false;
    }
  );
}

export { app, db, auth, loggedIn };