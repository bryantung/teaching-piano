import styled from 'styled-components';
import Keyboard from "./Components/Keyboard";

const AppComponent = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppComponent>
      <Keyboard />
    </AppComponent>
  );
}

export default App;
