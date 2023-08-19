
////////should modify it////////////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, setDoc, addDoc, orderBy, serverTimestamp, query, onSnapshot, where, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
////////should modify it////////////////////////
const firebaseConfig = {
  apiKey: "AIzaSyClpo8swwA_PSFRGYDqOgWkVRwPjloDt5c",
  authDomain: "threadapp-3129d.firebaseapp.com",
  projectId: "threadapp-3129d",
  storageBucket: "threadapp-3129d.appspot.com",
  messagingSenderId: "902832742728",
  appId: "1:902832742728:web:c80c2d85e2921748a5937d"
};

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

const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const userEmail = document.getElementById('userEmail')
const userPassword = document.getElementById('userPassword')
// const signUp = document.getElementById('signUp')
// const submitForm = document.getElementById('submitForm')
// let createUser = (event) => {
//     event.preventDefault()
//     // try {
//     axios.post('/JWT-Auth/signup', {
//         firstName: firstName.value,
//         lastName: lastName.value,
//         email: userEmail.value,
//         password: userPassword.value
//     })
//         .then((response) => {
//             console.log(response)
//             firstName.value = ""
//             lastName.value = ""
//             userEmail.value = ""
//             userPassword.value = ""
//             location.href = './AppFiles/signin.html'
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }
// submitForm.addEventListener('submit', createUser)



// Initialize Firebase

//const db = getFirestore(app)
//const storage = getStorage(app)
let user = auth.currentUser
let userAdd = async (userauthID, userEmail, userName) => {
  console.log(userEmail, userName)
  await setDoc(doc(db, "userDetails", userauthID), {
    userEmail: userEmail,
    userName: userName
  });
}

// let ufile = document.getElementById(`ufile`)
// let file = {}
// ufile.addEventListener(`change`, (event) => {
//   console.log(event.target.files)
//   file = event.target.files[0]
// })

/////////////This should be changed///////////////////
let but = document.querySelector(`#but`)
but.addEventListener(`click`, () => {
  let userName = document.querySelector(`#userName`).value
  let email = document.querySelector(`#uemail`).value
  let password = document.querySelector(`#upass`).value
  let user = auth.currentUser
  console.log(user)
//   let formContainer = document.getElementById(`formContainer`)
//   let redirectContainer = document.getElementById(`redirectContainer`)
//   formContainer.classList.add(`hidden`)
//   redirectContainer.classList.remove(`hidden`)
  //console.log("Document written with ID: ", docRef.id);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      console.log(user.uid)
    //   console.log(file)
      // /usersProfileImage

    //   const storageRef = ref(storage, 'users/' + user.uid + '/profile.jpg')
    //   // 'file' comes from the Blob or File API
    //   uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    //   });

      console.log(user.uid)
      let userID = user.uid
      console.log(userID)
      userAdd(userID, email, userName)
      // let body = document.querySelector(`body`)
      // body.classList.remove(`bg-blueImg`)

      //this.disabled = true

      //alert("hogaya")

      // ...
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

    window.location.href = './profile.html';
    //console.log(body)
    // let formContainer = document.getElementById(`formContainer`)
    // let redirectContainer = document.getElementById(`redirectContainer`)

    // if (!formContainer.classList.contains(`hidden`)) {

    //   formContainer.classList.add(`hidden`)
    //   redirectContainer.classList.remove(`hidden`)

    // }

    // let sec = 3;
    // const redirectHeading = document.getElementById('redirectHeading');

    // const myIntervalFunction = () => {
    //   redirectHeading.textContent = `Redirecting You to Your Profile Page in ${sec} seconds`;
    //   sec--;

    //   if (sec < 0) {
    //     clearInterval(interval);
    //     // Perform the redirect here, e.g.:
    //     window.location.href = './profile.html';
    //   }
    // };

    // const interval = setInterval(myIntervalFunction, 1000); // 1000 milliseconds = 1 second

  } else {

    console.log('User is logged out');
  }
};

onAuthStateChanged(auth, CheckingUser)