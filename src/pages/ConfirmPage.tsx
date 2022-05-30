/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { paramsIp } from '../hooks/useEdit';
import apiSwagger from '../models/apiSwagger.json';

export default function ConfirmPage() {
  const location = useLocation();
  const { serial } = useParams<paramsIp>();
  const [errors, setErrors] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([] as any);

  // 업데이트 하기 버튼 클릭 여부
  const btnState = location.state;

  const handleCompleteAxios = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/complete/${serial}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
        <h2 className="h2">{btnState ? '개봉일자 ' : null}등록이 완료되었습니다.</h2>
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
                <td>{lists.reagent_name}</td>
              </tr>
              <tr>
                <th>관리번호</th>
                <td>{lists.serial}</td>
              </tr>
              <tr>
                <th>Cat.</th>
                <td>{lists.cat_no}</td>
              </tr>
              <tr>
                <th>유통기한</th>
                <td>{lists.date}</td>
              </tr>
              {btnState ? (
                <>
                  <tr>
                    <th>개봉일자</th>
                    <td>{lists.open}</td>
                  </tr>
                  <tr>
                    <th className="word-break">개봉 후 기한</th>
                    <td>{lists.open_date}</td>
                  </tr>
                </>
              ) : null}
              <tr>
                <th>제조사</th>
                <td>{lists.company}</td>
              </tr>
              <tr>
                <th>용량</th>
                <td>{lists.amount}</td>
              </tr>
              <tr>
                <th>보관위치</th>
                <td>
                  {lists.location} - {lists.floor}
                </td>
              </tr>
              <tr>
                <th>담당자/확인자</th>
                <td>
                  {lists.owner}/{lists.confirmer}
                </td>
              </tr>
              <tr>
                <th>보관조건</th>
                <td>{lists.condition}°C</td>
              </tr>
              {btnState ? (
                <tr>
                  <th>비고</th>
                  <td>{lists.extra}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      <button type="button" className="button backColor-w margin-right20">
        <Link to={`/list/${lists.map_id}/`} className="txtDeco-m">
          메인으로
        </Link>
      </button>
    </main>
  );
}
