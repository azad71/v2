import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

import TextInput from "../common/Input/Input.js";
import CustomButton from "../common/Button/Button.js";
import ErrorText from "../common/ErrorText/ErrorText.js";
import FileInput from "../common/Input/FileInput.js";

import url from "../../config/url.json";

function SignupForm({ show, handleClose, errors, setErrors, ...otherProps }) {
  const alert = useAlert();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.files && e.target.files[0]) {
      setState({
        ...state,
        profileImage: e.target.files[0],
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("name", state.name);
      formData.append("email", state.email);
      formData.append("password", state.password);
      formData.append("password2", state.password2);
      formData.append("profileImage", state.profileImage);

      const signupRes = await axios.post(
        `${url.base}/api/auth/signup`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      if (signupRes.statusText === "OK" && signupRes.status === 200) {
        handleClose();
        alert.success("User registered successfully. Please Login to continue");
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

      <SignupFormContainer onSubmit={handleSubmit}>
        <Label>Name</Label>
        <TextInput
          value={state.name}
          name="name"
          type="name"
          onChange={handleChange}
        />
        <ErrorText>{errors.name}</ErrorText>

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

        <Label>Confirm Password</Label>
        <TextInput
          value={state.password2}
          name="password2"
          type="password"
          onChange={handleChange}
        />
        <ErrorText>{errors.password2}</ErrorText>

        <Label>Upload Profile Photo</Label>
        <FileInput name="profileImage" onChange={handleChange} />

        <CustomButton
          onClick={() => handleSubmit()}
          type="button"
          customStyles={{ width: "100%" }}
        >
          Login
        </CustomButton>
      </SignupFormContainer>
    </Modal>
  );
}

export default SignupForm;

const SignupFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Label = styled.label`
  padding-left: 5px;
`;
