import styled from "styled-components";
import { Card } from "react-bootstrap";
import { useState, Fragment } from "react";
import { connect } from "react-redux";

// import components
import AuthorInfo from "./AuthorInfo";
import Comments from "./Comments";
import CustomButton from "../common/Button/Button";
import Input from "../common/Input/Input";

function PostCard(props) {
  let { post } = props;

  const [showComment, setShowComment] = useState(false);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  const toggleShowComment = () => {
    setShowComment(!showComment);
    setShowAddCommentForm(false);
  };

  console.log(post);
  const toggleAddComment = () => setShowAddCommentForm(!showAddCommentForm);

  return (
    <CardContainer>
      <Card.Body>
        <AuthorInfo
          user={props.auth && props.auth.user}
          date={post.createdAt}
        />

        <img className="img-fluid" src={post.content} alt="post content" />

        {props.auth && props.auth.isAuthenticated && (
          <Fragment>
            <ReactToPostSection>
              <span>&#128514; {post.likes.length}</span>
              <span onClick={toggleShowComment}>
                &#128172; {post.comments.length}
              </span>
            </ReactToPostSection>

            {showComment && (
              <CommentContainer>
                <CustomButton onClick={toggleAddComment}>
                  Add Comment
                </CustomButton>
                {showAddCommentForm && <Input type="text" />}
                <Comments />
                <Comments />
                <Comments />
              </CommentContainer>
            )}
          </Fragment>
        )}
      </Card.Body>
    </CardContainer>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostCard);

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReactToPostSection = styled.div`
  display: flex;
  padding: 10px 20px 10px 0;
  font-size: 24px;

  & span {
    cursor: pointer;
    padding-right: 20px;

    :hover {
      background-color: #eee;
    }
  }
`;

const CardContainer = styled(Card)`
  margin-bottom: 40px;
  border: none;
`;
