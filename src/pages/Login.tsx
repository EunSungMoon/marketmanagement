import React from 'react';

export default function Login() {
  return (
    <form>
      <input type="text" name="username" placeholder="아이디" />
      <input type="text" name="password" placeholder="패스워드" />
      <button type="button">로그인</button>
    </form>
  );
}
