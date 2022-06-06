/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import logo from '../styles/images/logo.png';

export default function Login() {
  const navigate = useNavigate();

  const {
    values,
    disappearMsg,
    uniqueCheck,
    uniqueCheckMsg,
    passwordCheckMsg,
    passwordCheck,
    noMatchPassword,
    handlePasswordChk,
    handleChange,
    handleSubmit,
    handleCheckID,
  } = useSignup({
    initialValues: { username: '', password: '', passwordCheck: '' },
    onSubmit: () => {},
  });

  return (
    <main id="joinMain" className="container flex">
      <img src={logo} alt="채미왔소" />
      <form id="signup" className="flex formWrap" onSubmit={handleSubmit}>
        <div className="idWrap">
          <input
            type="text"
            className="login-size login-input backColor-g"
            name="username"
            placeholder="아이디"
            value={values.username}
            onChange={handleChange}
          />
          {disappearMsg ? <p className={`error font-${uniqueCheck ? 'g' : 'o'}`}>* {uniqueCheckMsg}</p> : null}
          <div className="userCheck">
            <button
              type="button"
              onClick={handleCheckID}
              className={`userCheckBtn ${uniqueCheck && disappearMsg ? 'backColor-m' : 'backColor-dg'}`}
            >
              {uniqueCheck && disappearMsg ? '확인완료' : '중복확인'}
            </button>
          </div>
        </div>
        <div className="idWrap">
          <input
            type="password"
            className="login-size login-input backColor-g"
            name="password"
            placeholder="패스워드"
            onChange={(e) => {
              handleChange(e);
              handlePasswordChk(e);
            }}
          />
          {disappearMsg && passwordCheck ? <p className="font-o error">* {passwordCheckMsg}</p> : null}
        </div>
        <div className="idWrap">
          <input
            type="password"
            className="login-size login-input backColor-g"
            name="passwordCheck"
            placeholder="패스워드 확인"
            onChange={(e) => {
              handleChange(e);
              handlePasswordChk(e);
            }}
          />
          {noMatchPassword && <p className="font-o error">* 비밀번호가 일치하지 않습니다.</p>}
          <p className="font-g pwInfo">비밀번호는 8개 이상의 영문자/숫자/특수문자를 사용합니다.</p>
        </div>
        <button
          type="submit"
          className={`login-size login-btn ${
            values.password === values.passwordCheck ? 'backColor-1stg' : 'backColor-dg'
          }`}
          disabled={values.password !== values.passwordCheck}
          form="signup"
        >
          회원가입
        </button>
        <button
          type="button"
          className="login-size login-btn backColor-2ndg"
          onClick={() => {
            navigate('/');
          }}
        >
          로그인하러 가기
        </button>
      </form>
    </main>
  );
}
