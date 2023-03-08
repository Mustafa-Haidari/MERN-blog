import React, { useEffect, useState } from "react";
import Post from "./Post";

const Home = () => {
  const [posts, setPosts] = useState({});
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}api/post`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setPosts(data);
      });
    });
  }, []);
  return (
    <div className="container-flui">
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        ) : (
          <h3>No posts available</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
