//////////////Should modify it////////////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, setDoc, addDoc, orderBy, serverTimestamp, query, onSnapshot, where, doc, getDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//////////////Should modify it////////////////////////
const firebaseConfig = {
    apiKey: "AIzaSyDizRqFG9fzEbtNmhmkdsuQVZ9O1vQMAHY",
    authDomain: "saylani-mini-hackathon-48c03.firebaseapp.com",
    projectId: "saylani-mini-hackathon-48c03",
    storageBucket: "saylani-mini-hackathon-48c03.appspot.com",
    messagingSenderId: "284827950058",
    appId: "1:284827950058:web:e5218c4c294528be4c7093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


let navList = document.getElementById('navList')
let bar = document.getElementById('bar')

bar.addEventListener('click', (event) => {

    bar.classList.contains('fa-bars') ? (() => {
        console.log("Condition is true.");
        bar.classList.toggle('fa-bars')
        bar.classList.toggle('fa-times')
        navList.classList.toggle('-translate-y-full')
        navList.classList.toggle('-translate-y-0')
    })() : (() => {
        console.log("Condition is true.");
        bar.classList.toggle('fa-times')
        bar.classList.toggle('fa-bars')
        navList.classList.toggle('-translate-y-0')
        navList.classList.toggle('-translate-y-full')
    })()

})



//////////////adding Post By user that has been logged in////////////////////////////////
let addBlog = async () => {

    const user = auth.currentUser;
    let userName;

    const q = query(collection(db, "userDetails"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data().firstName)
        if (user.email == doc.data().userEmail) {
            console.log(doc.data().firstName)
            userName = `${doc.data().firstName} ${doc.data().lastName}`;
            console.log(userName)
        }
        console.log(userName)
    })

    console.log(user.email)
    let postTitle = document.getElementById('postTitle')
    let postContent = document.getElementById('postContent')
    if (postTitle.value.trim().length != 0 && postContent.value.trim().length != 0) {
        const docRef = await addDoc(collection(db, "Blogs"), {
            postTitle: postTitle.value,
            postContent: postContent.value,
            userName: userName,
            uid: user.uid,
            userEmail: user.email,
            timestamp: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);

        postTitle.value = ""
        postContent.value = ""
    }
}

let addBlogButton = document.getElementById('addBlogButton')


addBlogButton.addEventListener('click', addBlog)

const CheckingUser = (user) => {
    if (user) {

        console.log('User is logged in:', user.email);

        // Perform the redirect here, e.g.:
        logInBut.innerText = 'Log Out'

    } else {

        console.log('User is logged out');
        window.location.href = './signin.html';

    }
};

onAuthStateChanged(auth, CheckingUser)
let logInBut = document.getElementById('logInBut')

logInBut.addEventListener(`click`, () => {
    signOut(auth).then(() => {
        // alert('succesfully signed out')
        location.href = './signin.html'
    }).catch((error) => {
        // An error happened.
    });
})

// logInBut.addEventListener('click', (event) => {
//     location.href = './signin.html'
// })