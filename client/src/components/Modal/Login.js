import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import jwt_decode from "jwt-decode";

import TextInput from "../common/Input/Input.js";
import CustomButton from "../common/Button/Button.js";
import ErrorText from "../common/ErrorText/ErrorText.js";

import { store } from "../../redux/store.js";
import setAuthToken from "../../utils/setAuthToken.js";
import { setCurrentUser } from "../../redux/auth/auth.actions.js";

import url from "../../config/url.json";

function LoginForm({
  show,
  handleClose,
  errors,
  setErrors,
  loginUser,
  ...otherProps
}) {
  const alert = useAlert();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const loginRes = await axios.post(`${url.base}/api/auth/login`, state);

      if (loginRes.status === 200 && loginRes.statusText === "OK") {
        const { token } = loginRes.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decodedData = jwt_decode(token);
        store.dispatch(setCurrentUser(decodedData));
        handleClose();
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      } else {
        alert.error("Failed to login user");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />

      <LoginFormContainer onSubmit={handleSubmit}>
        <Label>Email</Label>
        <TextInput
          value={state.email}
          name="email"
          type="email"
          onChange={handleChange}
        />
        <ErrorText>{errors.email}</ErrorText>

        <Label>Password</Label>
        <TextInput
          value={state.password}
          name="password"
          type="password"
          onChange={handleChange}
        />
        <ErrorText>{errors.password}</ErrorText>

        <CustomButton
          onClick={() => handleSubmit()}
          type="button"
          customStyles={{ width: "100%" }}
        >
          Login
        </CustomButton>
      </LoginFormContainer>
    </Modal>
  );
}

export default LoginForm;

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Label = styled.label`
  padding-left: 5px;
`;
