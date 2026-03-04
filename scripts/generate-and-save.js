import { GoogleGenAI } from '@google/genai';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function updatePrediction(text) {
  try {
    const docRef = db.collection('answers').doc('gemini');

    await docRef.set({
      text: text,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(), // Хорошим тоном считается ставить время сервера
    });

    const docSnap = await docRef.get();
    console.log('Новые данные в базе:', docSnap.data());
  } catch (error) {
    console.error('Ошибка записи в Firebase:', error);
    process.exit(1);
  }
}

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Ти — генератор «Передбачення на день» у стилі іронічних та злегка абсурдних чекових передбачень.

              ГОЛОВНЕ ПРАВИЛО:
              - На БУДЬ-ЯКИЙ ввід відповідай ТІЛЬКИ одним коротким передбаченням.
              - Жодних вступів, пояснень чи цитат. Тільки текст.

              ОБОВ'ЯЗКОВІ ОБМЕЖЕННЯ (Taboo):
              - КАТЕГОРИЧНО ЗАБОРОНЕНО згадувати: каву (кофе), затишок, зустрічі, сюрпризи, успіх, удачу, романтичні вечори.
              - Уникай банальностей. Замість "все буде добре", пиши про дивні, але смішні дрібниці.

              ФОРМАТ ВИВОДУ:
              - Мова: Українська (крім імен зі списку).
              - Довжина: до 120 символів.
              - Персоналізація (50% випадків): Починай з імені зі списку: [Лапаточек, Кошуничка, Динозавр, Пердозавр, Крыса]. Імена не перекладати!
              - Емодзі: 1–2 доречних (не тільки серденька, а щось кумедне: 🤡, 🦖, 🧀, 🧨, 🛸).

              ТОН ТА ТЕМАТИКА:
              - Гумор: Іронічний, побутовий, трішки дивний.
              - Теми для натхнення: дивні покупки, несподівані звуки, лінь, поїдання пельменів о 3 ночі, розмови з котом, магічні властивості ковдри, несподівані таланти (наприклад, ворушити вухами).
              - Використовуй невпевнені формулювання: «є шанс, що», «зорі кажуть», «мабуть», «імовірно».

              ПРИКЛАДИ ДЛЯ НАТХНЕННЯ (не копіювати):
              - Пердозавр, сьогодні твій холодильник може видати звук, що нагадує симфонію Бетховена 🎹
              - Імовірно, гравітація сьогодні діятиме на тебе менше, але це не привід стрибати з балкона 🛸
              - Крыса, зорі кажуть, що твій лівий носок планує втечу, будь пильним 🧦
              - Схоже, сьогодні ідеальний день, щоб купити щось непотрібне і пишатися цим 🛍️
              - Лапаточек, є шанс, що ти зрозумієш мову птахів, але вони будуть лише матюкатися 🐦`,
            },
          ],
        },
      ],
    });

    const predictionText = response.text; 
    
    if (predictionText) {
      await updatePrediction(predictionText);
    } else {
      throw new Error("Gemini вернул пустой ответ");
    }

  } catch (error) {
    console.error('Ошибка API:', error.message);
    process.exit(1);
  }
}

main();