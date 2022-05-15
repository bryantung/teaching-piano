import PropTypes from "prop-types";
import styled from "styled-components";


const NoteComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border: 0.75px solid grey;
  height: 80px;
  width: 24px;
  background: ${({ isPlaying }) => isPlaying ? `red` : `white`};
`;

function Note({
  note,
  alias,
  isPlaying = false
}) {
  return (
    <NoteComponent isPlaying={isPlaying}>{note}</NoteComponent>
  );
}

Note.propTypes = {
  note: PropTypes.string.isRequired,
  alias: PropTypes.string,
  isPlaying: PropTypes.bool
};

export default Note;