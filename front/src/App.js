import React from "react";
import { BrowserRouter as Router, useRoutes, Link } from "react-router-dom";
import { ThemeProvider } from "./theme/themeProvider";
import { GlobalStyle } from "./theme/GlobalStyle";
import "./App.css";

import Header from "./page/header";
import NewsList from "./page/newsList";
import NewsDetail from "./page/newsDetail";
import NewsMain from "./page/newsMain";

import useStore from './commonStore'

const App = () => {
  return useRoutes([
    { path: "/", element: <NewsMain /> },
    { path: "/list", element: <NewsList /> },
    { path: "/:id", element: <NewsDetail /> },
  ]);
};

const AppWrapper = () => {
  const { hasFixedBottom } = useStore()

  return (
    <Router>
      <ThemeProvider>
        <GlobalStyle />
        <div className={hasFixedBottom == true ? 'container has-fixed-bottom' : 'container'}>
          <Header />
          <App />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default AppWrapper;
