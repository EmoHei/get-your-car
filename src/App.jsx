import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import HeaderComp from './components/HeaderComp';
import PrivateRoute from './components/PrivateRoute';
import CreatePage from './pages/CreatePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage'
function App() {
  return (
    <>
      <Router>
        <HeaderComp></HeaderComp>

        <Routes>

          <Route path="/" element={<HomePage></HomePage>} />

          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/register" element={<RegisterPage></RegisterPage>} />

          <Route path="/create" element={<PrivateRoute />} >
            <Route path="/create" element={<CreatePage></CreatePage>} />
          </Route>
         
          <Route path="/logout" element={<PrivateRoute />} >
            <Route path="/logout" element={<HomePage></HomePage>} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPasswordPage></ForgotPasswordPage>}
          />
          <Route path="*" element={<NotFound />} />
        
        </Routes>

      </Router>
    </>
  );
}

export default App;
