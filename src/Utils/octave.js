export function getKeysForOctave(octave) {
  const octKeys = [];
  octKeys.push(`C${octave}`); octKeys.push(`C#${octave}`);
  octKeys.push(`D${octave}`); octKeys.push(`D#${octave}`);
  octKeys.push(`E${octave}`);
  octKeys.push(`F${octave}`); octKeys.push(`F#${octave}`);
  octKeys.push(`G${octave}`); octKeys.push(`G#${octave}`);
  octKeys.push(`A${octave}`); octKeys.push(`A#${octave}`);
  octKeys.push(`B${octave}`);
  return octKeys;
}

export function getAllKeysWithinOctaves(start = 0, end = 7) {
  const keys = [];
  for (let octave = start; octave <= end; octave++) {
    const o = getKeysForOctave(octave);
    keys.push(o);
  }
  return keys;
}