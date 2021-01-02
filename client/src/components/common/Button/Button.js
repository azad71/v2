import styled from "styled-components";

function CustomButton({ customStyles, onClick, children, ...otherProps }) {
  return (
    <Button customStyles={customStyles} onClick={onClick} {...otherProps}>
      {children}
    </Button>
  );
}

export default CustomButton;

const Button = styled.button`
  background-color: #000;
  margin-left: auto;
  color: white;
  border: 1px solid #000;
  padding: 5px 10px;
  outline: none;
  border-radius: 20px;
  margin-bottom: 10px;

  :focus {
    outline: none;
  }

  :hover {
    background-color: #fff;
    color: #000;
  }

  ${(props) => props.customStyles}
`;
