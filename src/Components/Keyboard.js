import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Note from "./Note";
import AudioKeys from "audiokeys";
import usePiano from "./Piano";
import { arrayWithNumRange } from "../Utils/array";
import { whiteKeysMap, getKeyFromNumericNote, blackKeysWithFillerMap } from "../Utils/key";
import { set } from "firebase/database";

const KeyboardComponent = styled.div`
  height: 80px;
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: row;
`;

const OctaveComponent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const KeysComponent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: ${({ accidental }) => accidental ? `55%` : `100%`};
  width: 100%;
  display: flex;
  flex-direction: row;
`

function Keyboard({
  octaveStart = 0,
  octaveEnd = 7,
  baseOctave = 4,
  user,
  session
}) {
  const allOctaves = arrayWithNumRange(octaveStart, octaveEnd);

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

  useEffect(() => {
    if (user) {
      set(user, {
        playingKeys: playingKeys
      })
    }
  }, [playingKeys, user]);

  return (
    <KeyboardComponent>
      {allOctaves.map(octave => (
        <OctaveComponent key={`octave-${octave}`}>
          <KeysComponent>
            {whiteKeysMap.map((k, i) => {
              const key = `${k}${octave}`;
              return (
                <Note 
                  note={key}
                  isPlaying={playingKeys.indexOf(key) !== -1}
                  key={key} />
              );
            }
            )}
          </KeysComponent>
          <KeysComponent accidental>
            {blackKeysWithFillerMap.map(k => {
              const key = `${k}${octave}`;
              return (
                <Note
                  accidental
                  note={key}
                  isPlaying={playingKeys.indexOf(key) !== -1}
                  key={key} />
              );
            }
            )}
          </KeysComponent>
        </OctaveComponent>
      ))}
    </KeyboardComponent>
  );
}

Keyboard.propsType = {
  octaveStart: PropTypes.number,
  octaveEnd: PropTypes.number,
  baseOctave: PropTypes.number,
  user: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired
};

export default Keyboard;