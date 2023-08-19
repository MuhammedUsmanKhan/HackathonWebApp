//////////////Should modify it////////////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, orderBy, serverTimestamp, query, onSnapshot, where, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//////////////Should modify it////////////////////////
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
        body.classList.toggle('bg-[#070724]')
        signupHead.classList.toggle('text-blue-600')
        signupHead.classList.toggle('text-white')
        main.classList.toggle('text-blue-600')
        main.classList.toggle('text-white')
        inps.forEach((input) => {
            input.classList.toggle('bg-[#070724]')
        })
        labels.forEach((label) => {
            label.classList.toggle('bg-[#070724]')
            label.classList.toggle('bg-white')
        })
        footer.classList.toggle('text-blue-600')
        footer.classList.toggle('text-white')
    }


})
lightMode.addEventListener(`click`, () => {
    if (body.classList.contains('bg-[#070724]')) {
        lightMode.disabled = true
        darkMode.disabled = false
        body.classList.toggle('bg-[#070724]')
        signupHead.classList.toggle('text-blue-600')
        signupHead.classList.toggle('text-white')
        main.classList.toggle('text-blue-600')
        main.classList.toggle('text-white')
        inps.forEach((input) => {
            input.classList.toggle('bg-[#070724]')
        })
        labels.forEach((label) => {
            label.classList.toggle('bg-[#070724]')
            label.classList.toggle('bg-white')
        })
        footer.classList.toggle('text-blue-600')
        footer.classList.toggle('text-white')
    }
})
const userEmail = document.getElementById('userEmail')
const userPassword = document.getElementById('userPassword')
const submitForm = document.getElementById('submitForm')
// let VerifyUser = (event) => {
//     event.preventDefault()
//     // try {
//     axios.post('/JWT-Auth/signin', {
//         email: userEmail.value,
//         password: userPassword.value
//     })
//         .then((response) => {
//             console.log(response)
//             userEmail.value = ""
//             userPassword.value = ""
//             if (response.status === 200) {
//                 window.location.href = "./post.html";
//             }
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }
// submitForm.addEventListener('submit', VerifyUser)


//const db = getFirestore(app)
let but = document.querySelector(`#but`)
but.addEventListener(`click`, async () => {

  let email = document.querySelector(`#Semail`).value
  let password = document.querySelector(`#Spass`).value

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      location.href = `./profile.html`
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
})

const CheckingUser = (user) => {
  if (user) {

    console.log('User is logged in:', user.email);

    // Perform the redirect here, e.g.:
    window.location.href = './profile.html';


    //const interval = setInterval(myIntervalFunction, 1000); // 1000 milliseconds = 1 second
  } else {

    console.log('User is logged out');
  }
};

onAuthStateChanged(auth, CheckingUser)