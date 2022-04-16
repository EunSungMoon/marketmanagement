/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import useJoin from '../hooks/useJoin';
import { useSampleState, useSampleDispatch } from '../context/UserContext';

export default function Login() {
  const { values, handleChange, handleSubmit, handleLogout } = useJoin({
    initialValues: { username: '', password: '' },
    onSubmit: () => {},
  });

  const state = useSampleState();
  const dispatch = useSampleDispatch();

  const handleToken = () => {
    if (!localStorage.token) {
      dispatch({ type: 'USER', user: 'true' });
    }
  };

  const handleDelete = () => {
    if (localStorage.token) {
      dispatch({ type: 'USER', user: 'false' });
      handleLogout();
    }
  };

  return (
    <form id="join" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="아이디" value={values.username} onChange={handleChange} />
      <input type="text" name="password" placeholder="패스워드" value={values.password} onChange={handleChange} />
      <button
        type="submit"
        form="join"
        onClick={() => {
          handleToken();
        }}
      >
        로그인
      </button>
      <button
        type="button"
        onClick={() => {
          handleDelete();
        }}
      >
        로그아웃
      </button>
      <div>{state.user}</div>
    </form>
  );
}
