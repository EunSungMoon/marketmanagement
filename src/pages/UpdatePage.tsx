/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { BsX } from 'react-icons/bs';
import useGetAxios from '../hooks/useGet';
import useEdit, { paramsIp } from '../hooks/useEdit';
import Dropbox from '../component/Dropdown';
import apiSwagger from '../models/apiSwagger.json';

export default function UpdatePage() {
  const today = new Date();

  const { serial } = useParams<paramsIp>();
  const [floor, setFloor] = useState([] as any);
  const [location, setLocation] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AxiosError>();
  const [open, setOpen] = useState<any>();
  const [stringOpen, setStringOpen] = useState('');
  const [openDate, setOpenDate] = useState<any>();
  const [stringOpenDate, setStringOpenDate] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [disabled1, setDisabled1] = useState(false);

  const handleDatePicker1 = (value: Date) => {
    setOpenDate(value);
    const stringToDate = value.toString();
    const stringToDateFormat = dayjs(stringToDate).format('YYYY-MM-DD');
    values.open_date = stringToDateFormat;
    setStringOpenDate(stringToDateFormat);
  };

  const handleDatePicker2 = (value: Date) => {
    setOpen(value);
    const stringToDate = value.toString();
    const stringToDateFormat = dayjs(stringToDate).format('YYYY-MM-DD');
    values.open = stringToDateFormat;
    setStringOpen(stringToDateFormat);
  };

  const { lists } = useGetAxios({
    method: 'GET',
    url: `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/update/${serial}/`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleFloorAxios = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/floor/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setFloor(loadData.data);
    } catch (error: any) {
      setErrors(error);
    }
  };

  const handleLocationAxios = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/storage/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLocation(loadData.data);
    } catch (error: any) {
      setErrors(error);
    }
  };

  const { values, setValues, handleChange, handleSubmit } = useEdit({
    initialValue: {
      location: '',
      floor: '',
      open: stringOpen,
      open_date: stringOpenDate,
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  });

  const handleLocation = () => {
    setValues({ ...values, location: '폐시약장' });
  };

  useEffect(() => {
    if (!loading) {
      handleFloorAxios();
      handleLocationAxios();
    }
    return () => setLoading(true);
  }, []);

  // if (errors) return <div>{errors}</div>;
  return (
    <main id="updateMain" className="container mainWrap">
      <div className="whiteBox backColor-w w-100">
        <h2 className="h2">개봉일자 등록하기</h2>
        <form id="edit" className="grayBox backColor-g" onSubmit={handleSubmit}>
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
                <th>시리얼 넘버</th>
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
              <tr>
                <th>개봉일자</th>
                <td className="position">
                  {lists.open ? (
                    <>{lists.open}</>
                  ) : (
                    <>
                      <DatePicker
                        className="dday-input"
                        name="open"
                        placeholderText="개봉일자 선택하기"
                        selected={open}
                        onChange={(value: Date, e: React.ChangeEvent<HTMLInputElement>) => {
                          handleDatePicker2(value);
                          handleChange(e);
                          setDisabled1(true);
                        }}
                        minDate={today}
                        dateFormat="yyyy-MM-dd"
                        locale={ko}
                        includeDates={[new Date()]}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        autoComplete="off"
                        disabled={disabled1}
                      />
                      <button
                        type="button"
                        className="clearBtn"
                        onClick={() => {
                          setValues({ ...values, open: '' });
                          setOpen('');
                          setDisabled1(false);
                        }}
                      >
                        <BsX />
                      </button>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <th className="word-break">개봉 후 기한</th>
                <td className="position">
                  {lists.open_date ? (
                    <>{lists.open_date}</>
                  ) : (
                    <>
                      <DatePicker
                        className="dday-input"
                        name="open_date"
                        placeholderText="개봉 후 기한 날짜 선택하기"
                        selected={openDate}
                        onChange={(value: Date, e: React.ChangeEvent<HTMLInputElement>) => {
                          handleDatePicker1(value);
                          handleChange(e);
                          setDisabled(true);
                        }}
                        minDate={today}
                        dateFormat="yyyy-MM-dd"
                        locale={ko}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        autoComplete="off"
                        disabled={disabled}
                      />
                      <button
                        type="button"
                        className="clearBtn"
                        onClick={() => {
                          setValues({ ...values, open_date: '' });
                          setOpenDate('');
                          setDisabled(false);
                        }}
                      >
                        <BsX />
                      </button>
                    </>
                  )}
                </td>
              </tr>
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
                  <div className="w-100 input-flex">
                    <Dropbox
                      inputId="group"
                      propmt="시약장 선택하기"
                      name="location"
                      options={location}
                      width="halfWidth margin-right10"
                      onChange={handleChange}
                      defaultValue={lists.location}
                    />
                    <Dropbox
                      inputId="group"
                      propmt="위치 선택하기"
                      name="floor"
                      options={floor}
                      width="halfWidth"
                      onChange={handleChange}
                      defaultValue={lists.floor}
                    />
                  </div>
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
            </tbody>
          </table>
        </form>
        {/* 폐기하기 */}
        <form id="discard" onSubmit={handleSubmit}>
          <input type="hidden" name="location" value={values.location} onChange={handleChange} />
        </form>
      </div>
      <div className="updateBtnWrap">
        <button type="submit" className="button backColor-w" form="edit">
          갱신하기
        </button>
        <button type="submit" form="discard" className="button backColor-w delteBtn" onClick={handleLocation}>
          폐기하기
        </button>
      </div>
    </main>
  );
}
