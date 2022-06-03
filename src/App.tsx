import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import './styles/style.scss';
import NoUserHeader from './layout/NoUserHeader';
import Header from './layout/Header';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Board from './layout/Board';
import EmptyPage from './pages/EmptyPage';
import EnrollPage from './pages/EnrollPage';
import ConfirmPage from './pages/ConfirmPage';
import UpdatePage from './pages/UpdatePage';
import SearchBoard from './pages/SearchBoard';
import DateFilterPage from './pages/DateFilterPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          {sessionStorage.token ? <Header /> : <NoUserHeader />}
          <Routes>
            {sessionStorage.token ? (
              <>
                <Route path="/main" element={<Main />} />
                <Route path="/list/:id" element={<Board />} />
                <Route path="/enroll" element={<EnrollPage />} />
                <Route path="/datefilter/" element={<DateFilterPage />} />
                <Route path="/update/:serial" element={<UpdatePage />} />
                <Route path="/confirm/:serial" element={<ConfirmPage />} />
                <Route path="/search/:values" element={<SearchBoard />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            <Route path="/" element={<Navigate replace to='/list/2' />}/>
            <Route path="*" element={<Navigate replace to="/404" />} />
            <Route path="/404" element={<EmptyPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
