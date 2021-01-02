import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";

import LoginForm from "../Modal/Login.js";
import SignupForm from "../Modal/Signup.js";

import { logOutUser } from "../../redux/auth/auth.actions.js";

function Navbar({ auth, logOutUser }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const openLoginForm = () => {
    setLoginErrors({});
    setShowLoginForm(true);
  };
  const closeLoginForm = () => setShowLoginForm(false);

  const openSignupForm = () => {
    setShowSignupForm(true);
    setSignupErrors({});
  };
  const closeRegisterForm = () => setShowSignupForm(false);

  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  const handleLogout = () => {
    logOutUser();
  };

  return (
    <NavbarContainer>
      <Logo>MEMEVERSE</Logo>
      {!auth.isAuthenticated ? (
        <AuthButtonContainer>
          <span onClick={openLoginForm}>Login</span>
          <LoginForm
            errors={loginErrors}
            setErrors={setLoginErrors}
            show={showLoginForm}
            handleClose={closeLoginForm}
          />
          <span onClick={openSignupForm}>Sign up</span>
          <SignupForm
            errors={signupErrors}
            setErrors={setSignupErrors}
            show={showSignupForm}
            handleClose={closeRegisterForm}
          />
        </AuthButtonContainer>
      ) : (
        <span onClick={() => handleLogout()}>Logout</span>
      )}
    </NavbarContainer>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 50px;
  width: 100%;
  background-color: #000;
  color: #fff;

  & span {
    cursor: pointer;
  }
`;

const Logo = styled.span`
  font-weight: bolder;
  font-size: 32px;
  letter-spacing: 1px;
`;

const AuthButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;

  & span {
    padding: 5px 20px;
    font-weight: 500;

    :hover {
      letter-spacing: 1px;
      transition: 600ms all;
    }
  }
`;
