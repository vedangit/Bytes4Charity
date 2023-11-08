import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6YT378-9vpEILZo8POogBoDnZ7wGAHP4",
  authDomain: "ngo-website-6a3d6.firebaseapp.com",
  projectId: "ngo-website-6a3d6",
  storageBucket: "ngo-website-6a3d6.appspot.com",
  messagingSenderId: "124249117595",
  appId: "1:124249117595:web:6ebb153a69cf750ce4873e",
  measurementId: "G-82GDSVNF4Z",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

function getUserRole(userId) {
    const userRef = ref(db, `users/${userId}/role`);
    return get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    });
  }
  
  function checkUserRoleAndShowDashboardButton() {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
  
        // Get the user's role from the database
        getUserRole(userId)
            .then((role) => {
                if (role === "Donor") {
                    // If the user is a donor, show the "Donor Dashboard" button
                    document.getElementById("donor-dashboard").style.display = "block";
                } else {
                    // If the user is not a donor, hide the button
                    document.getElementById("donor-dashboard").style.display = "none";
                }
                window.location.href = "ngo.html";
            })
            .catch((error) => {
                console.error("Error fetching user role: ", error);
            });
    }
  }
  
  // Call the function to check the user's role and show/hide the button
  checkUserRoleAndShowDashboardButton();
