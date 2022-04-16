import React from 'react';
import Login from './pages/Login';
import ReducerSample from './pages/ReducerSample';
import { useSampleState } from './context/SampleContext';

function App() {
  const state = useSampleState();
  return (
    <div className="App">
        {state.login==='login' ? <Login /> : null}

        <ReducerSample />
    </div>
  );
}

export default App;
