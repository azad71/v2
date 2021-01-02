import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import axios from "axios";

import PostCard from "../components/PostCard/PostCard.js";
import FileInput from "../components/common/Input/FileInput.js";
import Button from "../components/common/Button/Button.js";

import url from "../config/url.json";

function HomePage(props) {
  const alert = useAlert();

  const [{ src, alt, meme }, setPreviewImage] = useState({
    src: null,
    alt: "Upload a meme",
    meme: null,
  });

  const [posts, setPosts] = useState([]);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setPreviewImage({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
        meme: e.target.files[0],
      });
    }
  };

  const handlePost = () => {
    console.log(meme);
  };

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const fetchRes = await axios.get(`${url.base}/api/posts`);
        if (fetchRes.status === 200 && fetchRes.statusText === "OK") {
          setPosts(fetchRes.data);
        } else {
          alert.error("Failed to fetch data");
        }
      } catch (error) {
        alert.error("Something went wrong!");
      }
    };

    fetchMemes();
  }, []);

  return (
    <HomePageContainer>
      <Row>
        <Col md={8}>
          {posts.length
            ? posts.map((post, idx) => <PostCard key={idx} post={post} />)
            : "No memes posted yet"}
        </Col>
        <Col md={4}>
          {props.isAuthenticated && (
            <SideBar>
              <FileInput onChange={handleImage} />
              {src && (
                <Fragment>
                  <ImagePreviewContainer>
                    <img className="img-fluid" src={src} alt={alt} />
                  </ImagePreviewContainer>
                  <Button onClick={handlePost} customStyles={{ width: "100%" }}>
                    Post it, Homie!
                  </Button>
                </Fragment>
              )}
            </SideBar>
          )}
        </Col>
      </Row>
    </HomePageContainer>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(HomePage);

const ImagePreviewContainer = styled.div`
  margin: 30px 10px;
`;

const HomePageContainer = styled(Container)`
  padding: 50px 0;
`;

const SideBar = styled.div`
  position: sticky;
  top: 20px;
`;
