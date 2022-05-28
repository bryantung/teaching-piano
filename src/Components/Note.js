import PropTypes from "prop-types";
import styled from "styled-components";
import { rainbow, altRainbow } from "../Utils/color";
import { whiteKeysMap, blackKeysMap } from "../Utils/key";

const NoteComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border: 0.75px solid grey;
  height: 100%;
  width: 100%;
  font-size: 10pt;
  background: ${
    ({ isPlaying, accidental, note }) =>
      isPlaying
      ? accidental
        ? altRainbow[blackKeysMap.indexOf(`${note[0]}#`)]
        : rainbow[whiteKeysMap.indexOf(note[0])]
      : accidental ? `black` : `white`
  };
  color: ${({ accidental }) => accidental ? "white" : "black"};
  visibility: ${({ note }) => note ? "visible" : "hidden"};
`;

function Note({
  note,
  alias,
  accidental = false,
  isPlaying = false,
}) {
  return (
    <NoteComponent
      isPlaying={isPlaying}
      accidental={accidental}
      note={note}>
      {note}
    </NoteComponent>
  );
}

Note.propTypes = {
  note: PropTypes.string,
  alias: PropTypes.string,
  accidental: PropTypes.bool,
  isPlaying: PropTypes.bool
};

export default Note;