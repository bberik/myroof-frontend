import Footer from './components/footer/Footer';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Properties from './components/properties/Properties';
import PropertyDetails from './components/propertydetails/PropertyDetails';
import EditProperty from './components/editproperty/EditProperty';
import MyProfile from './components/myprofile/MyProfile';
import './App.css';
import NotFound from './components/notfound/NotFound';
import CreateProperty from './components/createproperty/CreateProperty';
import Complexes from './components/complexes/Complexes';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import React from 'react';
import Search from './components/search/Search';
import  AuthContext from './context/AuthContext';



function App() {
  // const { user } = useSelector((state) => state.auth)
  let { user } = useContext(AuthContext)
  const url = useLocation().pathname
  

  useEffect(() => {
    url && window.scrollTo(0, 0)
  }, [url])


  return (
    <div>
      <Routes>
        
        <Route path='/' element={
          <>
            <Navbar />
            <Search />
            <Properties />
            <Complexes />
            <Footer />
          </>
        } />

        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/signin' element={!user ? <Signin /> : <Navigate to='/' />} />

        <Route path='/property/:id' element={
          <>
            <Navbar />
            <PropertyDetails />
            <Footer />
          </>
        } />

        <Route path='/my-profile' element={
          user ?
            <>
              <Navbar />
              <MyProfile />
              <Footer />
            </>
            : <Navigate to='/signin' />
        } />

        <Route path='/listproperty' element={
          user ?
            <>
              <Navbar />
              <CreateProperty />
              <Footer />
            </>
            : <Navigate to='/signin' />
        } />

        <Route path='/editproperty/:id' element={
          user ?
            <>
              <Navbar />
              <EditProperty />
            </>
            : <Navigate to='/signin' />
        } />

        <Route path='*' element={
          <>
            <Navbar />
            <NotFound />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
