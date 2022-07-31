import { child, getDatabase, onDisconnect, push, ref, set } from "firebase/database";
import PropTypes from "prop-types";
import { useEffect } from "react";
import styled from 'styled-components';
import Keyboard from "./Components/Keyboard";

const AppComponent = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

function App({
  firebase,
  sessionId
}) {
  // const [userRef, setUserRef] = useState(null);
  // const [sessionRef, setSessionRef] = useState(null);
  // const [db, setDb] = useState(null);

  useEffect(() => {
    const _db = getDatabase(firebase);
    // setDb(_db);

    const usersRef = ref(_db, "activeUsers");
    const sessionsRef = ref(_db, "sessions");
    /**
     * Push a new user in activeUsers list
     */
    const _userRef = push(usersRef);
    set(_userRef, {
      id: _userRef.key,
      timestamp: +new Date(),
      playingKeys: []
    });
    // setUserRef(_userRef);

    const _sessionRef = !!sessionId
      ? child(sessionsRef, `${sessionId}`)
      : push(sessionsRef);
    set(child(_sessionRef, `users/${_userRef.key}`), true);
    // setSessionRef(_sessionRef);

    // cleanup when disconnects
    onDisconnect(_userRef).remove();
    onDisconnect(_sessionRef).remove(`users/${_userRef.key}`);
  }, [firebase, sessionId]);

  return (
    <AppComponent>
      <Keyboard />
    </AppComponent>
  );
}

App.propTypes = {
  firebase: PropTypes.object.isRequired,
  sessionId: PropTypes.string
}

export default App;
