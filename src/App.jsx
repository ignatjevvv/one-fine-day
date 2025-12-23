import { useState } from 'react';
import gemini from './Gmini';

function App() {
  const [response, setResponse] = useState(
    'Ймовірно, день здивує доброю дрібницею у звичних справах. ☀️',
  );

  console.log(gemini());
  return <>{response}</>;
}

export default App;
