import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthContext } from "../user-context";
import moment from "moment";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/api/post/${id}`).then((response) => {
      response.json().then((data) => {
        setPostInfo(data);
      });
    });
  }, []);

  const deletePost = (e) => {
    fetch(`http://localhost:8080/api/post/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        }
      })
      .catch((error) => {
        toast(error.error);
      });
  };

  if (!postInfo) return "";

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="card">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <img
              src={`http://localhost:8080/${postInfo.cover}`}
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card-body">
              <h1>{postInfo.title}</h1>
              <time>
                {moment(postInfo?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </time>
              <div className="author">
                {postInfo?.author.firstname + " " + postInfo?.author.lastname}
              </div>
              {userInfo.id === postInfo?.author._id && (
                <>
                  <Link to={`/edit/${postInfo?._id}`}>
                    <button className="btn btn-warning d-inline-felx btn-sm mt-2 me-2">
                      Edit this post
                    </button>
                  </Link>
                  <button
                    onClick={deletePost}
                    className="btn btn-danger d-inline-felx btn-sm mt-2"
                  >
                    Delete
                  </button>
                </>
              )}
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
