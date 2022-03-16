import { useEffect } from 'react';
import './App.css';
import { usePiano } from './Components/Piano';
import keyMap from "./keyboardMapping";

function App() {
  const { playNote, stopNote } = usePiano();
  
  useEffect(()=> {
    function attackOnKey({repeat, key}) {
      if (!repeat) {
        keyMap[key] && playNote(keyMap[key]);
      }
    }

    function releaseOnKey({key}) {
      keyMap[key] && stopNote(keyMap[key]);
    }

    document.addEventListener("keydown", attackOnKey);
    document.addEventListener("keyup", releaseOnKey);
    // on unmount
    return () => {
      document.removeEventListener("keydown", attackOnKey);
      document.removeEventListener("keyup", releaseOnKey);
    }
  }, [playNote, stopNote]);
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
