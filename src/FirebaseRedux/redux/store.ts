// store.ts
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from './cartReducer';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC0SSnal84zfB1VRrwQxPDgyFux3g1i5cM",
    authDomain: "democonnect-reactjs.firebaseapp.com",
    databaseURL: "https://democonnect-reactjs-default-rtdb.firebaseio.com",
    projectId: "democonnect-reactjs",
    storageBucket: "democonnect-reactjs.appspot.com",
    messagingSenderId: "460195135131",
    appId: "1:460195135131:web:a74f2e582fbb924727d03e",
    measurementId: "G-SQ3Z02ST3S"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

const store = createStore(cartReducer, applyMiddleware(thunk));

export default store;
