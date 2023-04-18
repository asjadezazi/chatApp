// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhaPqqRRNWJio_pqocjo20p-BFBINQFQo",
    authDomain: "ezaziclasschatapp.firebaseapp.com",
    projectId: "ezaziclasschatapp",
    storageBucket: "ezaziclasschatapp.appspot.com",
    messagingSenderId: "879249280703",
    appId: "1:879249280703:web:f93c093701d83b6fdb400a",
    measurementId: "G-RX4W27BRQG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);
