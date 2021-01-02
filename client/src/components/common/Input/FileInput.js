import styled from "styled-components";

function FileInput(props) {
  return <File {...props} type="file" />;
}

export default FileInput;

const File = styled.input`
  margin: 10px 0;
  ::-webkit-file-upload-button {
    background-color: #000;
    color: white;
    cursor: pointer;
    border-radius: 20px;

    :focus {
      outline: none;
    }
  }
`;
