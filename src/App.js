import { useEffect, useCallback } from 'react';
import './App.css';
import * as Tone from "tone";

const keyboardMapping = {
  "a": "C4",
  "w": "C#4",
  "s": "D4",
  "e": "D#4",
  "d": "E4",
  "f": "F4",
  "t": "F#4",
  "g": "G4",
  "y": "G#4",
  "h": "A4",
  "u": "A#4",
  "j": "B4",
  "k": "C5",
  "o": "C#5",
  "l": "D5",
  "p": "D#5",
  ";": "E5",
  ":": "F5",
  "[": "F#5",
  "'": "G5",
}

function App() {
  const sampler = new Tone.Sampler({
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();
  
  const attackOnKey = useCallback(async (event) => {
    if (!event.repeat) {
      await Tone.start();
      keyboardMapping[event.key] && sampler.triggerAttack(keyboardMapping[event.key]);
    }
  }, [sampler]);
  
  const releaseOnKey = useCallback((event) => {
    keyboardMapping[event.key] && sampler.triggerRelease(keyboardMapping[event.key]);
  }, [sampler]);

  useEffect(()=> {
    console.log("mounted")
    document.addEventListener("keydown", attackOnKey);
    document.addEventListener("keyup", releaseOnKey);
    // on unmount
    return () => {
      console.log("unmounted")
      document.removeEventListener("keydown");
      document.removeEventListener("keyup");
    }
  }, [sampler, attackOnKey, releaseOnKey]);
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
