/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { BsX } from 'react-icons/bs';
import { Label, Input } from '../component/FormComponents';
import Dropdown from '../component/Dropdown';
import useAdd from '../hooks/useAdd';
import apiSwagger from '../models/apiSwagger.json';

export default function EnrollPage() {
  const [reagent, setReagent] = useState([] as any);
  const [company, setCompany] = useState([] as any);
  const [location, setLocation] = useState([] as any);
  const [floor, setFloor] = useState([] as any);
  const [worker, setWorker] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState<any>();
  const [stringDate, setStringDate] = useState('');
  const today = new Date();

  const loadData = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/select/`);
      setReagent(loadData.data.reagent);
      setCompany(loadData.data.company);
      setLocation(loadData.data.location);
      setFloor(loadData.data.floor);
      setWorker(loadData.data.worker);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    return () => setLoading(false);
  }, []);

  const handleDatePicker = (value: Date) => {
    setDate(value);
    const stringToDate = value.toString();
    const stringToDateFormat = dayjs(stringToDate).format('YYYY-MM-DD');
    values.date = stringToDateFormat;
    setStringDate(stringToDateFormat);
  };

  const { values, setValues, handleChange, handleSubmit } = useAdd({
    initialValue: {
      reagent_name: '',
      serial: '',
      date: stringDate,
      location: '',
      company: '',
      cat_no: '',
      amount: '',
      floor: '',
      owner: '',
      confirmer: '',
      condition: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  });

  if (loading) return null;
  if (error) return null;

  return (
    <main id="enrollMain" className="container mainWrap">
      <div className="whiteBox backColor-w w-100">
        <h2 className="h2">등록하기</h2>
        <form id="enroll" className="grayBox backColor-g" onSubmit={handleSubmit}>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="productName" labelName="품목명" />
            <Dropdown
              inputId="productName"
              propmt="품목 선택하기"
              name="reagent_name"
              options={reagent}
              width="w-100"
              onChange={handleChange}
              defaultValue=""
            />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="serialNumber" labelName="시리얼 넘버" />
            <Input
              id="serialNumber"
              propmt="시리얼 넘버 입력하기"
              name="serial"
              width="w-100"
              onchange={handleChange}
            />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="catNumber" labelName="Cat." />
            <Input id="catNumber" propmt="Cat. 입력하기" name="cat_no" width="w-100" onchange={handleChange} />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="datepicker" labelName="유통기한" />
            <div className="w-100 position">
              <DatePicker
                className="dday-input"
                name="date"
                placeholderText="유통기한 선택하기"
                selected={date}
                onChange={(value: Date, e: React.ChangeEvent<HTMLInputElement>) => {
                  handleDatePicker(value);
                  handleChange(e);
                  setDisabled(true);
                }}
                minDate={today}
                dateFormat="yyyy-MM-dd"
                locale={ko}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                autoComplete="off"
                disabled={disabled}
              />
              <button
                type="button"
                className='clearBtn enroll-clear-position'
                onClick={() => {
                  setValues({ ...values, date: '' });
                  setDate('');
                  setDisabled(false);
                }}
              >
                <BsX />
              </button>
            </div>
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="maker" labelName="제조사" />
            <Dropdown
              inputId="maker"
              propmt="제조사 선택하기"
              name="company"
              options={company}
              width="w-100"
              onChange={handleChange}
              defaultValue=""
            />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="capacity" labelName="용량" />
            <Input id="capacity" propmt="입력하기" name="amount" width="w-100" onchange={handleChange} />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="group" labelName="보관위치" />
            <Dropdown
              inputId="group"
              propmt="시약장 선택하기"
              name="location"
              options={location}
              width="halfWidth margin-right10"
              onChange={handleChange}
              defaultValue=""
            />
            <Dropdown
              inputId="group"
              propmt="위치 선택하기"
              name="floor"
              options={floor}
              width="halfWidth"
              onChange={handleChange}
              defaultValue=""
            />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="worker" labelName="담당자/확인자" />
            <Dropdown
              inputId="worker"
              propmt="담당자 선택하기"
              name="owner"
              options={worker}
              width="halfWidth margin-right10"
              onChange={handleChange}
              defaultValue=""
            />
            <Dropdown
              inputId="worker"
              propmt="확인자 선택하기"
              name="confirmer"
              options={worker}
              width="halfWidth"
              onChange={handleChange}
              defaultValue=""
            />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="conditionLabel-ratio" use="storageCondition" labelName="보관조건" />
            <Input
              id="storageCondition"
              propmt="보관조건 입력하기"
              name="condition"
              width="quaterWidth"
              onchange={handleChange}
            />
            °C
          </div>
        </form>
      </div>
      <button type="submit" className="button backColor-w" form="enroll">
        등록하기
      </button>
    </main>
  );
}
