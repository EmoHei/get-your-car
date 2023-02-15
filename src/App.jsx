import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import HeaderComp from './components/HeaderComp';
import PrivateRoute from './components/PrivateRoute';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
function App() {
  return (
    <>
      <Router>
        <HeaderComp></HeaderComp>

        <Routes>

          <Route path="/" element={<HomePage></HomePage>} />
          {/* <Route path='/profile' element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/update/:id" element={<Edit />} /> */}

         <Route path="/login" element={<LoginPage></LoginPage>} />
       
          <Route path="/register" element={<RegisterPage></RegisterPage>} />
          <Route path="/create" element={<PrivateRoute />} >
            <Route path="/create" element={<CreatePage></CreatePage>} />
          </Route>

          {/* <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>} /> */}

          {/* <Route path='/' element={<PrivateRoute />}>
            <Route path="/offers" element={<Offers></Offers>} />
          </Route>
          <Route path='/category/:categoryName' element={<PrivateRoute />}>
            <Route path="/category/:categoryName" element={<Category></Category>} />
          </Route>
          <Route path='/category/:categoryName/:listingId' element={<PrivateRoute />}>
            <Route path="/category/:categoryName/:listingId" element={<Listing></Listing>} />
          </Route>

          <Route path="/create" element={<PrivateRoute />} >
            <Route path="/create" element={<Create></Create>} />
          </Route>

          <Route path="edit" element={<PrivateRoute />}>
            <Route path="/edit/:listingId" element={<Edit />} />
          </Route>

          <Route path="/logout" element={<PrivateRoute />} >
            <Route path="/logout" element={<HomePage></HomePage>} />
          </Route>
          <Route path="edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<Edit />} />
          </Route>

          <Route path="*" element={<NotFound />} /> */}
        </Routes>

      </Router>
    </>
  );
}

export default App;
