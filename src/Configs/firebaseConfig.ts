import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHu_ZLtlnMWU4X_C6Y0BRoPwz0YX3hYFY",
  authDomain: "pebbles-4b65f.firebaseapp.com",
  projectId: "pebbles-4b65f",
  storageBucket: "pebbles-4b65f.appspot.com",
  messagingSenderId: "908745012213",
  appId: "1:908745012213:web:5a3ff59a88d03eb3c466bc",
  measurementId: "G-211N9M9DSG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// export const appAuth = getAuth(app);
export { app };

// initAsyncStorage();
// const analytics = getAnalytics(app);

// IOS CLIENTS ID
// 545644307339-mf1tjjn7sa5k4an8ia23gser7dutlbbn.apps.googleusercontent.com
// ANDROID CLIENTS ID
// 545644307339-cle0eaetqg0ghe8oguhobe43n5i0kbep.apps.googleusercontent.com
