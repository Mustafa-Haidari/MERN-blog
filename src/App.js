import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { AuthContextProvider } from "./user-context";
import CreatePost from "./components/CreatePost";
import PostPage from "./components/PostPage";
import EditPage from "./components/EditPage";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Route>
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
