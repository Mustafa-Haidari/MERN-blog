import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreatePostEditor from "./Editor";

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();

  useEffect(() => {
    fetch(`http://localhost:8080/api/post/${id}`).then((response) => {
      response.json().then((data) => {
        setTitle(data.title);
        setContent(data.content);
      });
    });
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("id", id);
    data.set("content", content);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    fetch("http://localhost:8080/api/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        navigate("/post/" + id);
      }
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

export default EditPage;
