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
  unit: string
) {
  return {
    name,
    unit_price,
    total,
    waste,
    product_list,
    unit
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
        <TableCell>{list.total.toLocaleString()}{list.unit}</TableCell>
        <TableCell>{list.waste}{list.unit}</TableCell>
        <TableCell>{list.unit_price.toLocaleString()}???</TableCell>
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
                      ????????????
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '12%' }}>
                      ?????????
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      ????????????
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      ?????????
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      ??????
                    </TableCell>
                    <TableCell className="font-dg white-space" style={{ width: '10%' }}>
                      ??? ??????
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
                        {historyRow.sold_date}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.date)}`}>
                        {historyRow.amount.toLocaleString()}
                        {list.unit}
                      </TableCell>
                      <TableCell className={`font-dg white-space ${handleDate(historyRow.date, historyRow.date)}`}>
                        {handleAllAmount(list.unit_price, historyRow.amount)}???
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
            <TableCell className="productName white-space">?????????</TableCell>
            <TableCell className="totalProduct white-space">??? ?????????</TableCell>
            <TableCell className="dateProduct white-space">???????????? ?????? ?????????</TableCell>
            <TableCell className="dateProduct white-space">????????? ??????(????????????)</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {condition ? (
            <tr>
              <td className="noResult">??????????????? ????????????.</td>
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
