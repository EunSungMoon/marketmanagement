/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container, Offcanvas } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import logo from '../styles/images/textLogo.png';
import { jsonType } from '../component/Dropdown';
import apiSwagger from '../models/apiSwagger.json';

export default function Header() {
  const [values, setValues] = useState('');
  const [lists, setLists] = useState([] as any);
  const [locations, setLocations] = useState([] as any);
  const [error, setError] = useState<AxiosError>();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    document.location.href = '/';
  };

  const loadTabName = async () => {
    try {
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/location/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const diff = loadData.data.slice(0, 2);
      const category = loadData.data.slice(2);
      setLocations(category);
      setLists(diff);
    } catch (error: any) {
      setError(error);
    }
  };
  useEffect(() => {
    loadTabName();
  }, []);

  if (error) return <div>에러가 발생했습니다</div>;

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
    <header id="header" className="backColor-w">
      <div className="container">
        <Navbar expand={false}>
          <Container className="headerWrap">
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
                <Link className="txtDeco-m margin-percent" to="/enroll/" state={{ data: 'enroll' }}>
                  <button type="button" className="enrollBtn backColor-w" title="시약 등록하기">
                    <BiEdit />
                  </button>
                </Link>
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
                    {locations.map((location: jsonType) => (
                      <Link
                        to={{
                          pathname: `/list/${location.id}/`,
                        }}
                        key={location.name}
                        className="txtDeco-m"
                      >
                        <Nav.Item>
                          <Navbar.Text className="nav-link txtDeco-m">{location.name}</Navbar.Text>
                        </Nav.Item>
                      </Link>
                    ))}
                    {lists.map((list: jsonType) => (
                      <Link
                        to={{
                          pathname: `/list/${list.id}/`,
                        }}
                        key={list.name}
                        className="txtDeco-m"
                      >
                        <Nav.Item>
                          <Navbar.Text className="nav-link txtDeco-m">{list.name}</Navbar.Text>
                        </Nav.Item>
                      </Link>
                    ))}
                    <button type="button" className="logout-position logout-button backColor-w" onClick={handleLogout}>
                      로그아웃
                    </button>
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
