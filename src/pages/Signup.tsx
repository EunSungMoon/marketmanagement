/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import logo from '../styles/images/logo.png';
import validate from '../models/vaildate';

export default function Login() {
  const navigate = useNavigate();
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');

  const {
    values,
    errors,
    errorUser,
    checkID,
    errorPassword,
    handleChange,
    handleSubmit,
    handleCheckID,
    changeBtnName,
    handlePassword,
  } = useSignup({
    initialValues: { username: '', password: '', passwordCheck: '' },
    onSubmit: () => {},
    validate,
  });

  const handlePasswordChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoMatchPassword(e.target.value !== values.password);
    setPasswordCheck(e.target.value);
  };

  return (
    <main id="joinMain" className="container flex">
      <img src={logo} alt="채미왔소" />
      <form id="signup" className="flex inputWrap backColor-w" onSubmit={handleSubmit}>
        <div className="idWrap">
          <input
            type="text"
            className="login-size login-input backColor-g"
            name="username"
            placeholder="아이디"
            value={values.username}
            onChange={(e) => {
              handleChange(e);
              changeBtnName(e);
            }}
          />
          {errorUser ? (
            checkID ? (
              <p className="font-o error">*사용할 수 있는 아이디(ID)입니다.</p>
            ) : (
              <p className="font-r error">*사용할 수 없는 아이디(ID)입니다.</p>
            )
          ) : null}
          {errorUser && values.username === '' && <p className="font-r error">{errors.username}</p>}
          <div className="userCheck">
            <button
              type="button"
              onClick={handleCheckID}
              className={`userCheckBtn ${checkID && errorUser ? 'backColor-o' : 'backColor-dg'}`}
            >
              {checkID && errorUser ? '확인완료' : '중복확인'}
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
              handlePassword(e);
            }}
          />
          {errorPassword && values.password.length < 8 && (
            <p className="font-r error">*8자 이상의 패스워드를 사용해야 합니다.</p>
          )}
          {errorPassword && errors.password && <p className="font-r error">{errors.password}</p>}
        </div>
        <div className="idWrap">
          <input
            type="password"
            className="login-size login-input backColor-g"
            name="passwordCheck"
            placeholder="패스워드 확인"
            onChange={(e) => {
              handlePasswordChk(e);
              handleChange(e);
            }}
          />
          {errorPassword && errors.passwordCheck && <p className="font-r error">{errors.passwordCheck}</p>}
          {noMatchPassword && <p className="font-r error">*비밀번호가 일치하지 않습니다.</p>}
          <p className="font-dg pwInfo">비밀번호는 8개 이상의 영문자/숫자/특수문자를 사용합니다.</p>
        </div>
      </form>
      <div className="flex">
        <button
          type="submit"
          className={`login-size login-btn ${
            checkID && errorUser && values.passwordCheck && !noMatchPassword ? 'backColor-1stg' : 'backColor-dg'
          }`}
          disabled={!(checkID && errorUser && values.passwordCheck && !noMatchPassword)}
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
      </div>
    </main>
  );
}
