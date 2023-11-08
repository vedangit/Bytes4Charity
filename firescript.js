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

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");
const roleRadios = document.querySelectorAll('input[name="role"]');
const returnBtn = document.getElementById("return-btn");

// Function to get the role of the user from the Realtime Database
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

createacctbtn.addEventListener("click", function () {
  const isVerified = true;

  const signupEmail = signupEmailIn.value;
  const confirmSignupEmail = confirmSignupEmailIn.value;
  if (signupEmail !== confirmSignupEmail) {
    window.alert("Email fields do not match. Try again.");
    return;
  }

  const signupPassword = signupPasswordIn.value;
  const confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword !== confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.");
    return;
  }

  if (!signupEmail || !confirmSignupEmail || !signupPassword || !confirmSignUpPassword) {
    window.alert("Please fill out all required fields.");
    return;
  }

  // To create a user with a selected role (Member or Donor)
  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;
      const selectedRole = document.querySelector('input[name="role"]:checked').value;

      // To write user data, including the role, to the Realtime Database {EZ but still took time to make this code for no reason}
      const userRef = ref(db, `users/${userId}`);
      set(userRef, {
        email: signupEmail,
        role: selectedRole,
      });

      window.alert("Success! Account created.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(`Error occurred: ${errorMessage}`);
    });
});

submitButton.addEventListener("click", function () {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;
      console.log("Success! Welcome back!");
      window.alert("Success! Welcome back!");
      // To get the user's role from the Realtime Database :)
      getUserRole(userId)
        .then((role) => {
          console.log("User role:", role); // line for debugging xD
          if (role === "Donor") {
            // Redirect to the donor dashboard
           
            window.location.href = "memberdash.html";
          } else if (role === "Member") {
            // Redirect to the homepage
            
            window.location.href = "ngo.html";
          } else {
            console.log("Error 404 : NOT FOUND")
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          window.alert(`Error occurred: ${errorMessage}`);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      window.alert(`Error occurred: ${errorMessage}`);
    });
});


signupButton.addEventListener("click", function () {
  main.style.display = "none";
  createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
  main.style.display = "block";
  createacct.style.display = "none";
});
