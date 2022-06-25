import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyPage() {
  return (
    <div id="emptyPage" className="container">
      <h1>잘못된 접근입니다.</h1>
      <button type="button" className="backToHome backColor-w">
        <Link to="/" className="txtDeco-m">
          돌아가기
        </Link>
      </button>
    </div>
  );
}
