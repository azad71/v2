import styled from "styled-components";

import AuthorInfo from "./AuthorInfo";

function Comments(props) {
  return (
    <CommentSection>
      <AuthorInfo customStyles={{ paddingBottom: "5px" }} />
      <CommentText>LMAO!</CommentText>
    </CommentSection>
  );
}

export default Comments;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const CommentText = styled.p`
  margin-left: 60px;
  margin-bottom: 0;
`;
