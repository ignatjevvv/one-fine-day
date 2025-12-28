import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDB8YMgqVjkZiKG9gCd3przznZgILPDKzk',
  authDomain: 'one-fine-day-b7c05.firebaseapp.com',
  projectId: 'one-fine-day-b7c05',
  storageBucket: 'one-fine-day-b7c05.firebasestorage.app',
  messagingSenderId: '534630978830',
  appId: '1:534630978830:web:70bc91bd4ca366545f735f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Splitting text with emoji
function SlittingText({ response }) {
  const text = response;
  const emojiRegex = /\p{Extended_Pictographic}+/gu;

  const pureText = text.replace(emojiRegex, '');
  const emojis = text.match(emojiRegex)?.join('') || '';

  return (
    <div className="message-container">
      <span className="chroma-text chroma-text-animate text-part">{pureText}</span>
      <span className="emoji-part chroma-text-animate text-part">{emojis}</span>
    </div>
  );
}

function App() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    const docRef = doc(db, 'answers', 'gemini');

    const unsub = onSnapshot(
      docRef,
      snapshot => {
        if (snapshot.exists()) {
          setResponse(snapshot.data().text);
        } else {
          setResponse('Передбачення скоро з’явиться...');
        }
        setIsLoading(false); // Данные получены, выключаем загрузку
      },
      error => {
        console.error('Ошибка при чтении:', error);
        setIsLoading(false);
      },
    );

    return () => unsub();
  }, []);

  // 3. Условный рендеринг для удобства пользователя
  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <>
      <SlittingText response={response} />
    </>
  );
}

export default App;
