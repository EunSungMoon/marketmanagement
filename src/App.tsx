import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './styles/style.scss';
import { useSampleState } from './context/UserContext';
import NoUserHeader from './layout/NoUserHeader';
import Header from './layout/Header';

function App() {
  const state = useSampleState();
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          {state.user === 'true' ? <Header /> : <NoUserHeader />}
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
