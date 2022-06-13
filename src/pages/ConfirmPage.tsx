/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { paramsIp } from '../hooks/useEdit';
import apiSwagger from '../models/apiSwagger.json';

export default function ConfirmPage() {
  const { serial } = useParams<paramsIp>();
  const [errors, setErrors] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([] as any);
  const location = useLocation();

  const btnState = location.state as { data: any };
  const curLocation = btnState.data;

  const handleCompleteAxios = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/confirm/${serial}/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setLists(loadData.data);
    } catch (error: any) {
      setErrors(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      handleCompleteAxios();
    }
    return () => setLoading(false);
  }, []);

  if (errors) return <div>에러가 발생했습니다.</div>;

  return (
    <main id="confirmMain" className="container mainWrap">
      <div className="whiteBox backColor-w w-100">
        <h2 className="h2">등록이 완료되었습니다.</h2>
        <div className="grayBox backColor-g">
          <table className="w-ratio marginAuto">
            <caption className="blind">등록완료</caption>
            <colgroup>
              <col width="22%" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>품목명</th>
                <td>{lists.product_name}</td>
              </tr>
              <tr>
                <th>분류</th>
                <td>{lists.location}</td>
              </tr>
              <tr>
                <th>입고번호</th>
                <td>{lists.serial}</td>
              </tr>
              <tr>
                <th>수량</th>
                <td>{lists.amount}</td>
              </tr>
              <tr>
                <th>입고일</th>
                <td>{lists.in_date}</td>
              </tr>
              <tr>
                <th>유통기한</th>
                <td>{lists.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button type="button" className="button backColor-w margin-right20">
        <Link to={`/list/${curLocation}/`} className="txtDeco-m">
          메인으로
        </Link>
      </button>
    </main>
  );
}
