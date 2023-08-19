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

document.addEventListener('DOMContentLoaded', () => {
  const q = query(collection(db, "Blogs"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let blogContainer = document.getElementById('blogContainer')

    querySnapshot.forEach((doc) => {

      console.log(doc.data())

      // Create a div element with the specified classes
      // Create the main container div
      const container = document.createElement('div');
      container.className = 'bg-white p-8 rounded-lg shadow-md w-3/4';

      // Create the inner div for the rounded image and post details
      const innerDiv = document.createElement('div');
      innerDiv.className = 'flex mb-4 space-x-4';

      // Create the author image element
      const authorImage = document.createElement('img');
      authorImage.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
      authorImage.alt = 'Author';
      authorImage.className = 'w-16 h-16 rounded-full';

      // Create the div for post details
      const postDetailsDiv = document.createElement('div');
      postDetailsDiv.className = 'flex flex-col justify-between mb-4';

      // Create the post title element
      const postTitle = document.createElement('h2');
      postTitle.className = 'text-2xl font-semibold';
      postTitle.textContent = `${doc.data().postTitle}`;

      // Create the author information element
      const authorInfoDiv = document.createElement('div');
      authorInfoDiv.className = 'flex items-center space-x-2';

      const authorText1 = document.createElement('span');
      authorText1.className = 'text-gray-500';
      authorText1.textContent = 'By';

      const authorName = document.createElement('span');
      authorName.className = 'font-semibold';
      authorName.textContent = `${doc.data().userName}`;

      let dateinSec = doc.data().timestamp.seconds
      let fullDate = new Date(dateinSec * 1000)
      console.log(fullDate)
      // Step 3: Extract the components of the date(day , year and month)
      const day = fullDate.getDate();
      const year = fullDate.getFullYear();
      const month = fullDate.toLocaleString('en-us', { month: 'long' }); // Get the full month name
      // Step 4: Format the date components as a string
      const formattedDate = `${day} ${month} ${year}`;


      const authorText2 = document.createElement('span');
      authorText2.className = 'text-gray-500';
      authorText2.textContent = `Posted on ${formattedDate}`;

      authorInfoDiv.appendChild(authorText1);
      authorInfoDiv.appendChild(authorName);
      authorInfoDiv.appendChild(authorText2);

      postDetailsDiv.appendChild(postTitle);
      postDetailsDiv.appendChild(authorInfoDiv);

      // Create the post content element
      const postContent = document.createElement('p');
      postContent.className = 'text-gray-600 mb-4';
      postContent.textContent = `${doc.data().postContent}`;

      // Create the buttons div
      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'flex space-x-2';

      // Create the Edit button
      const editButton = document.createElement('a');
      editButton.className = ' text-blue-500 font-semibold py-2 hover:text-blue-600';
      editButton.textContent = 'See All Post';

     
      buttonsDiv.appendChild(editButton);
      //buttonsDiv.appendChild(deleteButton);

      // Append all elements to the main container div
      innerDiv.appendChild(authorImage);
      innerDiv.appendChild(postDetailsDiv);

      container.appendChild(innerDiv);
      container.appendChild(postContent);
      container.appendChild(buttonsDiv);

      // Append the postDiv to the document (replace "your-container-id" with the actual container ID)
      blogContainer.appendChild(container);


    });

  });









})
