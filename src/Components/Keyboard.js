import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Note from "./Note";
import AudioKeys from "audiokeys";
import usePiano from "./Piano";
import { getAllKeysWithinOctaves } from "../Utils/octave";
import { getKeyFromNumericNote } from "../Utils/key";

const KeyboardComponent = styled.div`
  display: flex;
  flex-direction: row;
`;

function Keyboard({
  octaveStart = 0,
  octaveEnd = 7,
  baseOctave = 4
}) {
  const allKeys = getAllKeysWithinOctaves(octaveStart, octaveEnd);

  const [playKey, stopKey] = usePiano();
  const [playingKeys, setPlayingKeys] = useState([]);

  useEffect(() => {
    const KeyboardKeys = new AudioKeys({ polyphony: Infinity });
    KeyboardKeys.set("rootNote", (baseOctave + 1) * 12);
    KeyboardKeys.down(e => {
      const key = getKeyFromNumericNote(e.note);
      playKey(key);
      setPlayingKeys(keys => [...keys, key]);
    });
    KeyboardKeys.up(e => {
      const key = getKeyFromNumericNote(e.note)
      stopKey(key);
      setPlayingKeys(keys => keys.filter((k => k !== key)));
    })
  }, [playKey, stopKey, baseOctave]);

  return (
    <KeyboardComponent>
      {allKeys.map((segment, idx) => {
        return segment.filter(k => k.indexOf("#") === -1).map(
          key => <Note note={key} isPlaying={playingKeys.indexOf(key) !== -1} key={`${key}`}/>
        );
      })}
    </KeyboardComponent>
  );
}

Keyboard.propsType = {
  octaveStart: PropTypes.number,
  octaveEnd: PropTypes.number,
  baseOctave: PropTypes.number
};

export default Keyboard;