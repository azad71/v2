import styled from "styled-components";

import profile from "../../assets/profile.jpg";

function AuthorInfo(props) {
  console.log("from author info", props);
  return (
    <AuthorContainer customStyles={props.customStyles}>
      <AuthorSection>
        <Image src={props.user.image} />
        <p>{props.user.name}</p>
      </AuthorSection>
      <p>{new Date(props.date).toDateString()}</p>
    </AuthorContainer>
  );
}

export default AuthorInfo;

const AuthorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  align-items: center;

  ${(props) => props.customStyles}
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;
