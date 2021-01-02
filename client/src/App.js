import styled from "styled-components";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken.js";
import { store } from "./redux/store.js";
import { setCurrentUser, logOutUser } from "./redux/auth/auth.actions";

// import components
import Navbar from "./components/Navbar/Navbar.js";
import HomePage from "./pages/HomePage.js";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedUserData = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedUserData));

  let currentTime = Date.now() / 1000;

  if (decodedUserData.exp < currentTime) {
    store.dispatch(logOutUser());
  }
}

function App() {
  return (
    <AppContainer>
      <Navbar />
      <HomePage />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div``;
