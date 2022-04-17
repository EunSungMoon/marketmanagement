/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useLogin({
    initialValues: { username: '', password: '' },
    onSubmit: () => {},
  });

  return (
    <form id="join" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="아이디" value={values.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="패스워드" onChange={handleChange} />
      <button
        type="submit"
        form="join"
        // onClick={() => {
        //   handleToken();
        // }}
      >
        로그인
      </button>
      <button
        type="button"
        onClick={() => {
          navigate('/signup');
        }}
      >
        회원가입
      </button>
    </form>
  );
}
