import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import './styles/style.scss';
import NoUserHeader from './layout/NoUserHeader';
import Header from './layout/Header';
import Signup from './pages/Signup';
import Main from './pages/Main';
import EmptyPage from './pages/EmptyPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          {sessionStorage.token ? <Header /> : <NoUserHeader />}
          <Routes>
            {sessionStorage.token ? (
              <Route path="/" element={<Main />} />
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            <Route path="*" element={<Navigate replace to="/404" />} />
            <Route path='/404' element={<EmptyPage />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
