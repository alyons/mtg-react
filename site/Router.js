import React from 'react';
import { Route, Routes } from 'react-router';

import AggregationPage from './pages/AggregationPage';
import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultsPage';

const Router = ({...props}) => {
  return (
    <Routes>
      <Route path='/graphs' element={<AggregationPage />} />
      <Route path='/results' element={<ResultsPage />} />
      <Route path='*' element={<LandingPage />} />
    </Routes>
  );
};

export default Router;