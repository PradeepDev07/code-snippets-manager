
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Explore from './pages/Explore';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Dashboardpage from './pages/Dashboardpage';
import TagsPage from './pages/TagsPage';
import AuthProtectedRoute from './productedRoutes/AuthProtectedRoute';

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noauth-explore" element={<Explore />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
          
        <Route element={<AuthProtectedRoute />} >
          <Route path="/dashboard" element={<Dashboardpage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/tags/:tag" element={<TagsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;