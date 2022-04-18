/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import logo from '../styles/images/logo.png';

export default function Login() {
  const navigate = useNavigate();

  const { values, loginFail, handleChange, handleSubmit } = useLogin({
    initialValues: { username: '', password: '' },
    onSubmit: () => {},
  });

  return (
    <main id="joinMain" className="container flex">
      <img src={logo} alt="채미왔소" />
      <form id="join" className="flex formWrap" onSubmit={handleSubmit}>
        <div className="idWrap">
          <input
            type="text"
            className="login-size login-input backColor-g"
            name="username"
            placeholder="아이디"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div className="idWrap">
          <input
            type="password"
            className="login-size login-input backColor-g"
            name="password"
            placeholder="패스워드"
            onChange={handleChange}
          />
          {loginFail ? <p className="font-o error">*아이디 또는 비밀번호를 확인해주세요</p> : null}
        </div>
        <button type="submit" className="login-size login-btn backColor-1stg" form="join">
          로그인
        </button>
        <button
          type="button"
          className="login-size login-btn backColor-2ndg"
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </button>
      </form>
    </main>
  );
}
