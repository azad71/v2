import styled from "styled-components";

function TextInput(props) {
  return <Input {...props} />;
}

export default TextInput;

const Input = styled.input`
  border: 1px solid #888;
  border-radius: 20px;
  outline: none;
  padding: 5px 10px;
  margin: 10px 0 20px 0;
  text-indent: 10px;
`;
