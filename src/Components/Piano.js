import { useCallback } from "react";
import * as Tone from "tone";

export const usePiano = () => {
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

  const playNote = useCallback(async key => {
    await Tone.start();
    sampler.triggerAttack(key);
  }, [sampler]);

  const stopNote = useCallback(key => {
    sampler.triggerRelease(key);
  }, [sampler])

  return { playNote, stopNote };
}