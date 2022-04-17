import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './styles/style.scss';
import NoUserHeader from './layout/NoUserHeader';
import Header from './layout/Header';
import Signup from './pages/Signup';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          {sessionStorage.token ? <Header /> : <NoUserHeader />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {sessionStorage.token ? <Route path="/main" element={<Main />} /> : null}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
