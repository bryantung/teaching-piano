const noteKeysMap = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function getKeyFromNumericNote(note) {
  const octave = Math.floor(note / 12);
  if (octave >= 0 && octave < 8) {
    return `${noteKeysMap[note % 12]}${octave}`;
  }
  return undefined;
}