import { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Note from "./Note";
import AudioKeys from "audiokeys";
import usePiano from "./Piano";

const KeyboardComponent = styled.div`
  display: flex;
  flex-direction: row;
`;

function Keyboard({
  octaves = 8,
  baseOctave = 4,
  playing = []
}) {
  function getOctave(octave) {
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

  const octaveSegments = [];
  for (let octave = 0; octave < octaves; octave++) {
    const o = getOctave(octave);
    octaveSegments.push(o);
  }

  const [playNote, stopNote] = usePiano();

  useEffect(() => {
    const KeyboardKeys = new AudioKeys({ polyphony: Infinity });
    KeyboardKeys.down(e => {
      console.log(e.note);
      playNote(e.note); // <<< needs to convert to alpha note + octave scale
    });
    KeyboardKeys.up(e => {
      console.log(e.note);
      stopNote(e.note); // <<< needs to convert to alpha note + octave scale
    })
  }, [playNote, stopNote]);

  return (
    <KeyboardComponent>
      {octaveSegments.map((segment, idx) => {
        return segment.filter(k => k.indexOf("#") === -1).map(
          key => <Note note={key} isPlaying={playing.includes(key)} key={`${key}-${idx}`}/>
        );
      })}
    </KeyboardComponent>
  );
}

Keyboard.propsType = {
  octaves: PropTypes.number,
  baseOctave: PropTypes.number,
  playing: PropTypes.array
};

export default Keyboard;