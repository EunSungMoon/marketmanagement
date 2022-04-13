import React from 'react';
import Login from './pages/Login';
import ReducerSample from './pages/ReducerSample';
import { SampleProvider } from './context/SampleContext';

function App() {
  return (
    <div className="App">
      <SampleProvider>
        <Login />
        <ReducerSample />
      </SampleProvider>
    </div>
  );
}

export default App;
