import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiCIJB9zf-i_NP0ufIBrRVG0MYwmS4qK0",
  authDomain: "teaching-piano.firebaseapp.com",
  databaseURL: "https://teaching-piano-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "teaching-piano",
  storageBucket: "teaching-piano.appspot.com",
  messagingSenderId: "751654117803",
  appId: "1:751654117803:web:99b1cf2b7aefff6d9ff2ee",
  measurementId: "G-DEW1TWDWHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App firebase={app} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
