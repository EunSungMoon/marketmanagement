import React from 'react';
import Login from './pages/Login';
import ReducerSample from './pages/ReducerSample';
import { SampleProvider, useSampleState } from './context/SampleContext';

function App() {
  const state = useSampleState();
  console.log(state)
  return (
    <div className="App">
        {state.login==='login' ? <Login /> : null}

        <ReducerSample />
    </div>
  );
}

export default App;
