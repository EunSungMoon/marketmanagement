/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useSampleState, useSampleDispatch, useJoin } from '../context/SampleContext';
// import useJoin from './useJoin';

export default function ReducerSample() {
  const { values, token, handleChange, handleSubmit, handleLogout } = useJoin({
    initialValues: { username: '', password: '' },
    onSubmit: () => {
      console.log('test');
    },
  });

  const handleToken = () => {
    if (token) {
      dispatch({ type: 'LOGIN', login: 'login' });
    }
  };

  const handleDelete = () => {
    if (token) {
      dispatch({ type: 'LOGIN', login: 'logout' });
    }
  };

  const state = useSampleState();
  const dispatch = useSampleDispatch();

  const setCount = () => dispatch({ type: 'SET_COUNT', count: 5 });
  const setText = () => dispatch({ type: 'SET_TEXT', text: 'bye' });
  const toggleGood = () => dispatch({ type: 'TOGGLE_GOOD' });

  return (
    <>
      <div>
        <p>
          <code>count:</code> {state.count}
        </p>
        <p>
          <code>text:</code> {state.text}
        </p>
        <p>
          <code>isGood:</code> {state.isGood ? 'true' : 'false'}
        </p>
        <p>
          <code>login:</code> {state.login}
        </p>
        <div>
          <button type="button" onClick={setCount}>
            SET_COUNT
          </button>
          <button type="button" onClick={setText}>
            SET_TEXT
          </button>
          <button type="button" onClick={toggleGood}>
            TOGGLE_GOOD
          </button>
          <button type="button" onClick={handleDelete}>
            LOGOUT
          </button>
        </div>
      </div>
      <form id="join" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="아이디" value={values.username} onChange={handleChange} />
        <input type="text" name="password" placeholder="패스워드" value={values.password} onChange={handleChange} />
        <button type="submit" form="join" onClick={handleToken}>
          로그인
        </button>
      </form>
    </>
  );
}
