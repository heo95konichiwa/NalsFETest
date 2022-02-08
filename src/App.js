
import React, { Suspense, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/bootstrap.scss';
import Articles from './pages/articles';

function App() {

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route name="articles" exact path="/articles" element={<Articles />} />
            <Route name="articleDetail" exact path="/articles/:id" element={<Articles />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
