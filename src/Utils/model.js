// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

class ModelSingleton {
  constructor() {
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
    }
    this.application = initializeApp(firebaseConfig);
    this.model = getDatabase(this.application);
  }

  getApplication = () => {
    return this.application;
  }
  
  getModelRef = (path) => {
    return ref(this.model, path);
  }
};

const modelInstance = new ModelSingleton();
Object.freeze(modelInstance);

export default modelInstance;
