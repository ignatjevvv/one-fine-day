import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore'; // setDoc пока не используется, можно удалить
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'; // onAuthStateChanged для отслеживания состояния авторизации

// Твоя конфигурация веб-приложения Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDB8YMgqVjkZiKG9gCd3przznZgILPDKzk',
  authDomain: 'one-fine-day-b7c05.firebaseapp.com',
  projectId: 'one-fine-day-b7c05',
  storageBucket: 'one-fine-day-b7c05.firebasestorage.app',
  messagingSenderId: '534630978830',
  appId: '1:534614679042:web:70bc91bd4ca366545f735f', // Проверь этот appId, он должен быть как в fact: 1:875614679042:web:5813c3e70a33e91ba0371b.
};

// Инициализируй Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const docRef = doc(db, 'answers', 'gemini');
const docSnap = await getDoc(docRef);

// await setDoc(doc(db, 'answers', 'gemini'), {
//   text: "Well-Well",
// });

if (docSnap.exists()) {
  console.log('Document data:', docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log('No such document!');
}
