export const fullKeysMap = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const whiteKeysMap = ["C", "D", "E", "F", "G", "A", "B"];

export const blackKeysMap = ["C#", "D#", "F#", "G#", "A#"];

export const blackKeysWithFillerMap = ["X0", "C#", "D#", "X1", "F#", "G#", "A#", "X2"];

export function getKeyFromNumericNote(note) {
  const octave = Math.floor(note / 12) - 1;
  if (octave >= 0 && octave < 8) {
    return `${fullKeysMap[note % 12]}${octave}`;
  }
  return undefined;
}