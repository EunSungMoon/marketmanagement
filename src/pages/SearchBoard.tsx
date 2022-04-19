/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineCaretLeft, AiOutlineCaretDown } from 'react-icons/ai';
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
import axios, { AxiosError } from 'axios';
import apiSwagger from '../models/apiSwagger.json';
import ModalComponent from '../component/ModalComponent';

interface reagentType {
  serial: string;
  open: string;
  open_date: string;
  date: string;
  reagent_name: string;
  cat_no: string;
  location: string;
  company: number;
  amount: string;
  floor: string;
  owner: string;
  confirmer: string;
  condition: string;
  map: string;
}

type paramsIp = {
  values: string;
};

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
    if (!paraDate2) {
      if (dateNum1 < today) {
        return 'red';
      }
    } else if (dateNum1 < today || dateNum2 < today) {
      return 'red';
    }
    return '';
  };

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
        <TableCell className="test" style={{ padding: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-dg white-space" style={{ width: '18%' }}>
                      시리얼 넘버
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
                        {historyRow.open_date}
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
                        - {historyRow.floor}
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

export default function SearchBoard() {
  const { values } = useParams<paramsIp>();
  const [lists, setLists] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

  const handleAxios = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/search/${values}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLists(loadData.data);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleAxios();
  }, [values]);

  if (error) return <div>에러가 발생했습니다.</div>;
  if (loading) return null;

  return (
    <main id="board" className="container">
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
