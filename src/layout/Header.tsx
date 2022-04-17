/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Nav, Navbar, Container, Offcanvas } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../styles/images/textLogo.png';
import useGet from '../hooks/useGet';
import { jsonType } from '../component/Dropdown';
import apiSwagger from '../models/apiSwagger.json';

export default function Header() {
  const [values, setValues] = useState('');
  const navigate = useNavigate();

  const { lists } = useGet({
    method: 'GET',
    url: `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/storage/`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValues(e.target.value);
  };

  const handleMovePage = () => {
    if (values !== '') {
      navigate(`/search/${values}`);
    } else {
      // eslint-disable-next-line no-alert
      alert('검색어를 확인해주세요.');
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigate(`/search/${values}`);
    }
  };
  return (
    <header id="header" className='backColor-w'>
      <div className="container">
        <Navbar expand={false}>
          <Container fluid>
            <Link to={{ pathname: `/` }}>
              <h1 className="logoArea">
                <img src={logo} alt="로고" />
                <span className="blind">채미왔소</span>
              </h1>
            </Link>
            <div className="formWrap">
              <div className="form">
                <div className="inputWrap margin-percent backColor-g">
                  <label htmlFor="productSearch" className="blind">
                    검색하기
                  </label>
                  <input
                    type="text"
                    id="productSearch"
                    name="name"
                    className="searchInput"
                    aria-label="Search"
                    onChange={handleSearchChange}
                    onKeyDown={handleKey}
                    autoComplete="off"
                  />
                  <button type="button" className="searchBtn" onClick={handleMovePage}>
                    <BsSearch />
                  </button>
                </div>
                <button type="button" className="enrollBtn margin-percent backColor-w">
                  <Link className="txtDeco-o" to="/enroll/" state={{ data: 'enroll' }}>
                    등록하기
                  </Link>
                </button>
              </div>

              <Navbar.Toggle aria-controls="offcanvasNavbar" className="mainColor">
                <GiHamburgerMenu />
              </Navbar.Toggle>
              <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">
                    <h1 className="logoArea">
                      <img src={logo} alt="로고" />
                      <span className="blind">재고관리</span>
                    </h1>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {lists.map((list: jsonType) => (
                      <Link
                        to={{
                          pathname: `/list/${list.id}/`,
                        }}
                        key={list.name}
                        className="txtDeco-o"
                      >
                        <Nav.Item>
                          <Navbar.Text className="nav-link txtDeco-o">{list.name}</Navbar.Text>
                        </Nav.Item>
                      </Link>
                    ))}
                    <Link
                      to={{
                        pathname: '/list/1/',
                      }}
                      className="txtDeco-o"
                    >
                      <Nav.Item>
                        <Navbar.Text className="nav-link txtDeco-o">폐시약장</Navbar.Text>
                      </Nav.Item>
                    </Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Container>
        </Navbar>
      </div>
      <div className="headerImg" />
    </header>
  );
}
