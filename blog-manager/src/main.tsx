import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./Pages/Home";
import Articles from "./Pages/Articles";
import ArticlePage from "./Pages/ArticlePage";
import New from "./Pages/New";
import Error404 from "./Pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Home /> },
      { path: "articles", element: <Articles /> },
      { path: "article/:id", element: <ArticlePage /> },
      { path: "new", element: <New /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
