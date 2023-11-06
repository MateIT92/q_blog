import { Routes, Route, Navigate } from "react-router-dom";
import { helloMessage } from "./utils/utilMessages";
import BlogGlobalContextProvider from "./context/BlogGlobalContextProvider";
import LayoutContainer from "./components/layout/LayoutContainer";
import PostListContainer from "./components/posts-list/PostsListContainer";
import "./App.css";

export const App = () => {
  return (
    <div className="app">
      <BlogGlobalContextProvider>
        <LayoutContainer message={helloMessage}>
          <Routes>
            <Route
              path="/"
              element={<PostListContainer message={helloMessage} />}
            />
            <Route
              path="/post/:id"
              element={<PostListContainer message={helloMessage} />}
            />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </LayoutContainer>
      </BlogGlobalContextProvider>
    </div>
  );
};
