/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

export interface productType {
  serial: string;
  location: string;
  unit: string;
  in_date: string;
  date: string;
  amount: string;
  product_name: string;
  sold_date: string;
}

export type paramsIp = {
  values: string;
};

export function createData(
  name: string,
  unit_price: string,
  total: number,
  waste: number,
  product_list: Array<productType>,
) {
  return {
    name,
    unit_price,
    total,
    waste,
    product_list,
  };
}

export function Row(props: { list: ReturnType<typeof createData> }) {
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

  const handleAllAmount = (unit: string, amount: string) => {
    const unitNum = Number(unit);
    const amountNum = Number(amount);
    return (unitNum * amountNum).toLocaleString();
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row">
          {list.name}
        </TableCell>
        <TableCell>{list.total.toLocaleString()}</TableCell>
        <TableCell>{list.waste}</TableCell>
        <TableCell>{list.unit_price.toLocaleString()}원</TableCell>
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
                      입고번호
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '12%' }}>
                      입고일
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      유통기한
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      수량
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      판매일
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      총 가격
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.product_list.map((historyRow) => (
                    <TableRow key={historyRow.serial}>
                      <TableCell className="font-dg" component="th" scope="row">
                        <Link to={`/update/${historyRow.serial}/`}>{historyRow.serial}</Link>
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.date)}`}>
                        {historyRow.in_date}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.date)}`}>
                        {historyRow.date}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.date)}`}>
                        {historyRow.amount.toLocaleString()}
                        {historyRow.unit}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.date)}`}>
                        {historyRow.sold_date}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.date)}`}>
                        {handleAllAmount(list.unit_price, historyRow.amount)}원
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

export default function CollapseTableComponent(props: any) {
  const { lists, condition } = props;

  return (
    <TableContainer component={Paper} className="customTable">
      <Table aria-label="collapsible table">
        <TableHead className="backColor-g">
          <TableRow>
            <TableCell className="productName white-space">품목명</TableCell>
            <TableCell className="totalProduct white-space">총 재고량</TableCell>
            <TableCell className="dateProduct white-space">유통기한 지난 재고량</TableCell>
            <TableCell className="dateProduct white-space">소비자 가격(단위가격)</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {condition ? (
            <tr>
              <td className="noResult">검색결과가 없습니다.</td>
            </tr>
          ) : (
            <>
              {lists.map((list: ReturnType<typeof createData>) => (
                <Row key={list.name} list={list} />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
