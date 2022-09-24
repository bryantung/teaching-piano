import { child, onDisconnect, push, remove, set } from "firebase/database";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import Keyboard from "./Components/Keyboard";
import modelInstance from "./Utils/model";

const AppComponent = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [userRef, setUserRef] = useState(null);
  const [sessionRef, setSessionRef] = useState(null);
  const location = useLocation();
  const sessionId = location.hash ? location.hash.substring(1) : undefined;

  useEffect(() => {
    const { getModelRef } = modelInstance;
    /**
     * Push a new user in activeUsers list
     */
    const _userRef = push(getModelRef("activeUsers"));
    set(_userRef, {
      id: _userRef.key,
      timestamp: +new Date(),
      playingKeys: []
    });
    
    const sessionsRef = getModelRef("sessions");
    const _sessionRef = !!sessionId
      ? child(sessionsRef, `${sessionId}`)
      : push(sessionsRef);
    const _userSessionRef = getModelRef(`sessions/${_sessionRef.key}/users/${_userRef.key}`);
    set(_userSessionRef, true);
    window.location.hash = _sessionRef.key;

    setUserRef(_userRef);
    setSessionRef(_sessionRef);
    
    // cleanup when disconnects
    onDisconnect(_userRef).remove();
    onDisconnect(_userSessionRef).remove();

    // cleanup when unmounting
    return () => {
      remove(_userRef);
      remove(_userSessionRef);
    };
  }, [sessionId]);

  return (
    <AppComponent>
      <Keyboard user={userRef} session={sessionRef} />
    </AppComponent>
  );
}

App.propTypes = {
  sessionId: PropTypes.string
}

export default App;
