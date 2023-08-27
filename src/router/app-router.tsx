import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { Home } from '@/pages';
import { SwitchRoutes } from './interfaces';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={SwitchRoutes.root} element={<Home />} />
    </Routes>
  );
}

