/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { BsBookmark } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { AiOutlineCaretLeft, AiOutlineCaretDown, AiOutlineFileExcel } from 'react-icons/ai';
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
}

type paramsIp = {
  id: string;
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
        <TableCell className="white-space" component="th" scope="row">
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
                        {historyRow.date ? historyRow.date : 'NA'}
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
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.open_date)}`}>
                        {historyRow.floor}
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
    </>
  );
}

export default function Board() {
  const { id } = useParams<paramsIp>();
  const [lists, setLists] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [locationTitle, setLocationTitle] = useState([] as any);
  const [title, setTitle] = useState('');
  const [mapImg, setMapImg] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/listdetail/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLists(loadData.data);
    } catch (error: any) {
      setError(error);
    }
  };

  const loadLocationAxios = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/storage/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLocationTitle(loadData.data);
    } catch (error: any) {
      setError(error);
    }
  };

  const loadExportFileAxios = async () => {
    try {
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/export/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([loadData.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.csv`;
      link.click();
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      loadLocationAxios();
      loadData();
    }
    if (loading && id !== '1') {
      const idTostring = Number(id);
      const key = locationTitle.find((list: any) => list.id === idTostring);
      setTitle(key.name);
      setMapImg(key.map);
    }
    return () => setLoading(false);
  }, [id, locationTitle]);

  if (error) return <div>에러가 발생했습니다.</div>;
  if (loading) return null;

  return (
    <main id="board" className="container">
      <div className="flex-start">
        <h2 className="locationTitle">
          <BsBookmark />
          {id === '1' ? ' 폐시약장' : ` ${title}`}
        </h2>
        <button
          type="button"
          className="export backColor-w"
          title="엑셀파일 다운로드하기"
          onClick={loadExportFileAxios}
        >
          <AiOutlineFileExcel />
        </button>
        <button type="button" className="export backColor-w" title="약도보기" onClick={() => setModalShow(true)}>
          <FiMapPin />
        </button>
        <ModalComponent
          show={modalShow}
          title={id === '1' ? ' 폐시약장' : ` ${title}`}
          img={`${mapImg}`}
          onHide={() => setModalShow(false)}
        />
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
