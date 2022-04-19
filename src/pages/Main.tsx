import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../styles/images/logo.png';

export default function Main() {
  const navigate = useNavigate();

  return (
    <main id="main" className="container flex">
      <img src={logo} alt="채미왔소" />
      <div className="flex">
        <button type="button" className='button-main backColor-1stg' onClick={() => navigate('/list/2')}>
          전체 목록보기
        </button>
        <button type="button" className='button-main backColor-2ndg' onClick={() => navigate('/enroll')}>
          제품 등록하기
        </button>
      </div>
    </main>
  );
}
