import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, setDoc, addDoc, orderBy, serverTimestamp, query, onSnapshot, where, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClpo8swwA_PSFRGYDqOgWkVRwPjloDt5c",
  authDomain: "threadapp-3129d.firebaseapp.com",
  projectId: "threadapp-3129d",
  storageBucket: "threadapp-3129d.appspot.com",
  messagingSenderId: "902832742728",
  appId: "1:902832742728:web:c80c2d85e2921748a5937d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
let user = auth.currentUser
let userAdd = async (userauthID, userEmail, userName) => {
  console.log(userEmail, userName)
  await setDoc(doc(db, "userDetails", userauthID), {
    userEmail: userEmail,
    userName: userName
  });
}

let showPass = document.getElementById(`showPass`)
let signupPass = document.getElementById(`userPassword`)
let hidePass = document.getElementById(`hidePass`)
showPass.addEventListener(`click`, () => {
  signupPass.type = 'text'
  showPass.classList.add('hidden')
  hidePass.classList.remove('hidden')
  hidePass.classList.add('flex')
})
hidePass.addEventListener(`click`, () => {
  signupPass.type = 'password'
  hidePass.classList.add('hidden')
  showPass.classList.remove('hidden')
})
let darkMode = document.getElementById(`darkMode`)
let lightMode = document.getElementById(`lightMode`)
let body = document.querySelector(`body`)
let signupHead = document.querySelector(`header`)
let main = document.querySelector('main')
let inps = document.querySelectorAll('input')
let labels = document.querySelectorAll('label')
let footer = document.querySelector('footer')
darkMode.addEventListener(`click`, () => {

  if (!body.classList.contains('bg-white')) {
    lightMode.disabled = false
    darkMode.disabled = true
    body.classList.toggle('bg-[#0f172a]')
    signupHead.classList.toggle('text-white')
    main.classList.toggle('text-white')
    inps.forEach((input) => {
      input.classList.toggle('bg-[#0f172a]')
    })
    labels.forEach((label) => {
      //if (!label.classList.contains('bg-white')) {
      // label.classList.remove('bg-white')
      label.classList.toggle('bg-[#0f172a]')
      label.classList.toggle('bg-white')
      //}
    })
    footer.classList.toggle('text-white')
  }


})
lightMode.addEventListener(`click`, () => {
  if (body.classList.contains('bg-[#0f172a]')) {
    lightMode.disabled = true
    darkMode.disabled = false
    body.classList.toggle('bg-[#0f172a]')
    signupHead.classList.toggle('text-white')
    main.classList.toggle('text-white')
    inps.forEach((input) => {
      input.classList.toggle('bg-[#0f172a]')
    })
    labels.forEach((label) => {
      //if (label.classList.contains('bg-white')) {
      // label.classList.add('bg-white')
      label.classList.toggle('bg-white')
      label.classList.toggle('bg-[#0f172a]')
      //}
    })
    footer.classList.toggle('text-white')
  }
})


const signUp = document.getElementById('signUp')
// const submitForm = document.getElementById('submitForm')
signUp.addEventListener(`click`, () => {
  const userName = document.getElementById('userName').value
  const userEmail = document.getElementById('userEmail').value
  const userPassword = document.getElementById('userPassword').value
  let user = auth.currentUser
  console.log(user)
  let formContainer = document.getElementById(`formContainer`)
  let redirectContainer = document.getElementById(`redirectContainer`)
  formContainer.classList.add(`hidden`)
  redirectContainer.classList.remove(`hidden`)
  //console.log("Document written with ID: ", docRef.id);

  createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {

      const user = userCredential.user;
      console.log(user.uid)
      // /usersProfileImage

      console.log(user.uid)
      let userID = user.uid
      console.log(userID)
      userAdd(userID, userEmail, userName)

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
})

const CheckingUser = (user) => {
  if (user) {

    console.log('User is logged in:', user.email);
    //console.log(body)
        // Perform the redirect here, e.g.:
        window.location.href = './profile.html';

  } else {

    console.log('User is logged out');
  }
};

onAuthStateChanged(auth, CheckingUser)