import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import './App.css';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';
import Signup from './pages/Signup';
import EditAccount from './pages/EditAccount';

function App() {

  const getToken = () => {
    return localStorage.getItem("authToken")
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="App">

<Navbar />

<Routes>

  <Route path='/' element={<Home />} />

  <Route element={<LoggedIn />}>

  <Route path='/account/:id' element={<Account />} />
  <Route path='/edit-account/:id' element={<EditAccount />} />

  </Route>

  <Route element={<NotLoggedIn />}>

    <Route path='/signup' element={<Signup />} />
    <Route path='/login' element={<Login />} />

  </Route>

</Routes>

    </div>
  );
}

export default App;
