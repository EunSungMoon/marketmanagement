/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import useSignup from '../hooks/useSignup';

export default function Login() {
  const { values, handleChange, handleSubmit } = useSignup({
    initialValues: { username: '', password: '', passwordCheck: '' },
    onSubmit: () => {},
  });

  return (
    <form id="signup" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="아이디" value={values.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="패스워드" onChange={handleChange} />
      <input type="password" name="passwordCheck" placeholder="패스워드 확인" onChange={handleChange} />
      <button type="submit" form="signup">
        회원가입
      </button>
    </form>
  );
}
