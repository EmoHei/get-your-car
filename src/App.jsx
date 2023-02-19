import React from 'react';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import Category from './pages/Category';
import Listing from './pages/Listing';
import Edit from './pages/Edit'
function App() {
  return (
    <>
      <Router>
        <HeaderComp></HeaderComp>

        <Routes>

          <Route path="/" element={<HomePage></HomePage>} />
        
 <Route path="/offers" element={<Offers></Offers>} />
          
          <Route path='/category/:categoryName' element={<PrivateRoute />}>
            <Route path="/category/:categoryName" element={<Category></Category>} />
          </Route>
          <Route path='/category/:categoryName/:listingId' element={<PrivateRoute />}>
            <Route path="/category/:categoryName/:listingId" element={<Listing></Listing>} />
          </Route>
          <Route path="edit" element={<PrivateRoute />}>
            <Route path="/edit/:listingId" element={<Edit />} />
          </Route>
          <Route path="edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<Edit />} />
          </Route>

          <Route path="/update/:id" element={<Edit />} />

          <Route path='/profile' element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

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

      {/* Notification */}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
