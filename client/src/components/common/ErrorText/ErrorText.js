import styled from "styled-components";

function ErrorText(props) {
  return <ErrorTextContainer>{props.children}</ErrorTextContainer>;
}

export default ErrorText;

const ErrorTextContainer = styled.p`
  color: red;
  font-size: 14px;
`;
