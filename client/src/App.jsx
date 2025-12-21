
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
import { AuthProvider } from './context/store';
import CodeEditor from './pages/CodeEditor';

const App = () => {
  return (
    <AuthProvider>
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
          <Route path="/editor" element={<CodeEditor />} />
          
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-3xl font-bold">404 - Page Not Found</div>} />

        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App;