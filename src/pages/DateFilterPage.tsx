/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { AiOutlineCaretLeft, AiOutlineCaretDown, AiOutlineInfoCircle } from 'react-icons/ai';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { BsBookmark } from 'react-icons/bs';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import useDateFilter from '../hooks/useDateFilter';
import apiSwagger from '../models/apiSwagger.json';
import ModalComponent from '../component/ModalComponent';
import { reagentType } from './SearchBoard';

function createData(name: string, total: number, waste: number, usable: number, reagent_list: Array<reagentType>) {
  return {
    name,
    total,
    waste,
    usable,
    reagent_list,
  };
}

function Row(props: { list: ReturnType<typeof createData> }) {
  const { list } = props;
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState('');
  const [mapImg, setMapImg] = useState('');

  const handleDate = (paraDate1: string, paraDate2: string) => {
    const dateNum1 = new Date(paraDate1);
    let dateNum2: Date = new Date('3000-12-31');
    const today = new Date();
    if (paraDate2) {
      dateNum2 = new Date(paraDate2);
    }
    if (!paraDate2 && dateNum1 < today) {
      return 'red';
    }
    if (dateNum1 < today || dateNum2 < today) {
      return 'red';
    }
    return '';
  };

  const popover = (extra: string) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">비고</Popover.Header>
      <Popover.Body>{extra}</Popover.Body>
    </Popover>
  );

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row">
          {list.name}
        </TableCell>
        <TableCell>{list.total}</TableCell>
        <TableCell>{list.waste}</TableCell>
        <TableCell>{list.usable}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row">
            {open ? <AiOutlineCaretDown className="font-b" /> : <AiOutlineCaretLeft className="font-b" />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-dg white-space" style={{ width: '18%' }}>
                      관리번호
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '12%' }}>
                      Cat.
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      유통기한
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      개봉일자
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      개봉 후 기한
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      제조사
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '6%' }}>
                      용량
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '6%' }}>
                      보관위치
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '9%' }}>
                      담당자/확인자
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '9%' }}>
                      보관조건
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.reagent_list.map((historyRow) => (
                    <TableRow key={historyRow.serial}>
                      <TableCell className="font-dg" component="th" scope="row">
                        {historyRow.location !== '폐시약장' ? (
                          <Link to={`/update/${historyRow.serial}/`}>{historyRow.serial}</Link>
                        ) : (
                          // eslint-disable-next-line react/jsx-no-useless-fragment
                          <>{historyRow.serial}</>
                        )}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.open_date)}`}>
                        {historyRow.cat_no}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.open_date)}`}>
                        {historyRow.date}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.open_date)}`}>
                        {historyRow.open}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.open_date)}`}>
                        {historyRow.extra ? (
                          <OverlayTrigger trigger="click" overlay={popover(historyRow.extra)}>
                            <button type="button" className="extra">
                              {historyRow.open_date}{' '}
                              <span className="extraIcon">
                                <AiOutlineInfoCircle />
                              </span>
                            </button>
                          </OverlayTrigger>
                        ) : (
                          historyRow.open_date
                        )}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.open_date)}`}>
                        {historyRow.company}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.open_date)}`}>
                        {historyRow.amount}
                      </TableCell>
                      <TableCell
                        className={`font-dg white-space goToMap ${handleDate(historyRow.date, historyRow.open_date)}`}
                        title="약도보기"
                      >
                        <span
                          onClick={() => {
                            setModalShow(true);
                            setTitle(historyRow.location);
                            setMapImg(historyRow.map);
                          }}
                        >
                          {historyRow.location}
                        </span>
                        {historyRow.location !== '폐시약장' ? `-${historyRow.floor}` : ''}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.open_date)}`}>
                        {historyRow.owner}/{historyRow.confirmer}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.open_date)}`}>
                        {historyRow.condition}°C
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ModalComponent
        show={modalShow}
        title={title}
        img={`${apiSwagger.url}:${apiSwagger.port}${mapImg}`}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

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
      <TableContainer component={Paper} className="customTable">
        <Table aria-label="collapsible table">
          <TableHead className="backColor-g">
            <TableRow>
              <TableCell className="productName white-space">품목명</TableCell>
              <TableCell className="totalProduct white-space">총 재고량</TableCell>
              <TableCell className="dateProduct white-space">유통기한 지난 재고량</TableCell>
              <TableCell className="dateProduct white-space">사용 가능한 재고량</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.map((list: ReturnType<typeof createData>) => (
              <Row key={list.name} list={list} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
