/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import { BsBookmark } from 'react-icons/bs';
import useDateFilter from '../hooks/useDateFilter';
import CollapseTableComponent from '../component/CollapseTableComponent';

export default function DateFilterPage() {
  const [start, setStart] = useState<any>();
  const [end, setEnd] = useState<any>();
  const [startStringDate, setStartStringDate] = useState('');
  const [endStringDate, setEndStringDate] = useState('');

  const { values, lists, handleChange, handleSubmit } = useDateFilter({
    initialValue: {
      start: startStringDate,
      end: endStringDate,
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  });

  const handleStartDatePicker = (value: Date) => {
    setStart(value);
    const stringToDate = value.toString();
    const stringToDateFormat = dayjs(stringToDate).format('YYYY-MM-DD');
    values.start = stringToDateFormat;
    setStartStringDate(stringToDateFormat);
  };

  const handleEndDatePicker = (value: Date) => {
    setEnd(value);
    const stringToDate = value.toString();
    const stringToDateFormat = dayjs(stringToDate).format('YYYY-MM-DD');
    values.end = stringToDateFormat;
    setEndStringDate(stringToDateFormat);
  };

  return (
    <main id="board" className="container dateFilter">
      <div className="flex-space-between titleWrap">
        <h2 className="datefilterTitle">
          <BsBookmark /> 개봉현황
        </h2>
        <form id="dateFilter" className="flex-center" onSubmit={handleSubmit}>
          <DatePicker
            className="dday-input"
            name="start"
            placeholderText="yyyy-mm-dd"
            selected={start}
            onChange={(value: Date, e: React.ChangeEvent<HTMLInputElement>) => {
              handleStartDatePicker(value);
              handleChange(e);
            }}
            dateFormat="yyyy-MM-dd"
            locale={ko}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            autoComplete="off"
          />
          <DatePicker
            className="dday-input"
            name="end"
            placeholderText="yyyy-mm-dd"
            selected={end}
            onChange={(value: Date, e: React.ChangeEvent<HTMLInputElement>) => {
              handleEndDatePicker(value);
              handleChange(e);
            }}
            dateFormat="yyyy-MM-dd"
            locale={ko}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            autoComplete="off"
          />
          <button type="submit" className="backColor-w font-m filterButton" form="dateFilter">
            검색
          </button>
        </form>
      </div>

      <CollapseTableComponent lists={lists} />
    </main>
  );
}
