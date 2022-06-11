/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { BsX } from 'react-icons/bs';
import { Label, Input } from '../component/FormComponents';
import { Dropdown, SelectBox } from '../component/Dropdown';
import useAdd from '../hooks/useAdd';

export default function EnrollPage() {
  const [disabled, setDisabled] = useState(false);
  const [inDateDisabled, setInDateDisabled] = useState(false);
  const [date, setDate] = useState<any>();
  const [inDate, setInDate] = useState<any>();
  const [stringDate, setStringDate] = useState('');
  const [stringInDate, setStringInDate] = useState('');
  const today = new Date();

  const handleDatePicker = (value: Date) => {
    setDate(value);
    const stringToDate = value.toString();
    const stringToDateFormat = dayjs(stringToDate).format('YYYY-MM-DD');
    values.date = stringToDateFormat;
    setStringDate(stringToDateFormat);
  };

  const handleInDatePicker = (value: Date) => {
    setInDate(value);
    const stringToDate = value.toString();
    const stringToDateFormat = dayjs(stringToDate).format('YYYY-MM-DD');
    values.in_date = stringToDateFormat;
    setStringInDate(stringToDateFormat);
  };

  const { values, error, product, unit, location, setValues, handleChange, handleSubmit } = useAdd({
    initialValue: {
      product_name: '',
      location: '',
      unit: '',
      serial: '',
      amount: '',
      in_date: stringInDate,
      date: stringDate,
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  });

  if (error) return <div>에러가 발생했습니다.</div>;
  
  return (
    <main id="enrollMain" className="container mainWrap">
      <div className="whiteBox backColor-w w-100">
        <h2 className="h2">등록하기</h2>
        <form id="enroll" className="grayBox backColor-g" onSubmit={handleSubmit}>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="productName" labelName="품목명" />
            <Dropdown
              inputId="productName"
              propmt="품목명 선택하기"
              name="product_name"
              options={product}
              width="w-100"
              onChange={handleChange}
              defaultValue=""
            />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="category" labelName="분류" />
            <SelectBox
              inputId="category"
              name="location"
              options={location}
              width="w-100"
              onChange={handleChange}
              defaultValue="분류 선택하기"
            />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="unitSelect" labelName="단위" />
            <SelectBox
              inputId="unitSelect"
              name="unit"
              options={unit}
              width="w-100"
              onChange={handleChange}
              defaultValue="단위 선택하기"
            />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="serialNumber" labelName="입고번호" />
            <Input id="serialNumber" propmt="입고번호 입력하기" name="serial" width="w-100" onchange={handleChange} />
          </div>

          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="amountInput" labelName="수량" />
            <Input id="amountInput" propmt="수량 입력하기" name="amount" width="w-100" onchange={handleChange} />
          </div>
          <div className="inputWrap input-flex w-ratio marginAuto">
            <Label ratio="label-ratio" use="datepicker" labelName="입고일" />
            <div className="w-100 position">
              <DatePicker
                className="dday-input"
                name="in_date"
                placeholderText="입고일 선택하기"
                selected={inDate}
                onChange={(value: Date, e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInDatePicker(value);
                  handleChange(e);
                  setInDateDisabled(true);
                }}
                minDate={today}
                dateFormat="yyyy-MM-dd"
                locale={ko}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                autoComplete="off"
                disabled={inDateDisabled}
              />
              <button
                type="button"
                className="clearBtn enroll-clear-position"
                onClick={() => {
                  setValues({ ...values, in_date: '' });
                  setDate('');
                  setInDateDisabled(false);
                }}
              >
                <BsX />
              </button>
            </div>
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
                className="clearBtn enroll-clear-position"
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
        </form>
      </div>
      <button type="submit" className="button backColor-w" form="enroll">
        등록하기
      </button>
    </main>
  );
}
