/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import useEdit from '../hooks/useEdit';

export default function UpdatePage() {
  const today = new Date();
  const [todayString, setTodayString] = useState('');

  const handleToday = (value: Date) => {
    const stringToDate = value.toString();
    const stringToDateFormat = dayjs(stringToDate).format('YYYY-MM-DD');
    values.sold_date = stringToDateFormat;
    setTodayString(stringToDateFormat);
  };

  const { lists, values, setValues, handleSubmit } = useEdit({
    initialValue: {
      location: '',
      sold_date: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  });

  const handleLocation = () => {
    setValues({ ...values, location: '폐기현황', sold_date:'' });
  };

  const handleSoldLocation = () => {
    setValues({ ...values, location: '매출현황', sold_date: todayString });
  };

  useEffect(() => {
    handleToday(today);
  }, []);

  return (
    <main id="updateMain" className="container mainWrap">
      <div className="whiteBox backColor-w w-100">
        <h2 className="h2">개봉일자 등록하기</h2>
        <form id="edit" className="grayBox backColor-g">
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
        </form>

        {/* 판매하기 */}
        <form id="sold" onSubmit={handleSubmit}>
          <input type="hidden" name="sold_date" value={values.sold_date}/>
        </form>
        {/* 폐기하기 */}
        <form id="discard" onSubmit={handleSubmit}>
          <input type="hidden" name="location" value={values.location}/>
        </form>
      </div>

      <div className="updateBtnWrap">
        <button type="submit" form="sold" className="button backColor-w" onClick={handleSoldLocation}>
          판매하기
        </button>
        <button type="submit" form="discard" className="button backColor-w delteBtn" onClick={handleLocation}>
          폐기하기
        </button>
      </div>
    </main>
  );
}
