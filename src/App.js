
import React, { Suspense, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/bootstrap.scss';
import Articles from './pages/articles';
import ArticlesDetail from './pages/articlesDetail';

function App() {

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route name="articles" exact path="/" element={<Articles />} />
            <Route name="articlesDetail" exact path="/articles-detail/:id" element={<ArticlesDetail />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
