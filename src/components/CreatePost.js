import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePostEditor from "./Editor";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();

  const formHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("files", files[0]);
    data.set("content", content);
    console.log(data);
    fetch("http://localhost:8080/api/post", {
      method: "POST",
      body: data,
      credentials: "include",
    }).then((response) => {
      navigate("/");
    });
  };

  return (
    <div className="container-fluid w-75">
      <h2 className="text-center mb-4">Create new post</h2>
      <div className="card p-3">
        <form onSubmit={formHandler} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="postTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="postTitle"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Image
            </label>
            <input
              className="form-control"
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              id="formFile"
              aria-describedby="imageNote"
            />
            <div id="imageNote" className="form-text">
              Please only select 1 file
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="formContent" className="form-label">
              Content
            </label>
            <CreatePostEditor
              content={content}
              id="formContent"
              setContent={setContent}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
