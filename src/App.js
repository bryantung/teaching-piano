import { child, getDatabase, onDisconnect, push, ref, remove, set } from "firebase/database";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  firebase
}) {
  // const [userRef, setUserRef] = useState(null);
  // const [sessionRef, setSessionRef] = useState(null);
  // const [db, setDb] = useState(null);
  const location = useLocation();
  const sessionId = location.hash ? location.hash.substring(1) : undefined;

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
    const _userSessionRef = ref(_db, `sessions/${_sessionRef.key}/users/${_userRef.key}`);
    set(_userSessionRef, true);
    // setSessionRef(_sessionRef);
    window.location.hash = _sessionRef.key;

    // cleanup when disconnects
    onDisconnect(_userRef).remove();
    onDisconnect(_userSessionRef).remove();

    // cleanup when unmounting
    return () => {
      remove(_userRef);
      remove(_userSessionRef);
    };
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
