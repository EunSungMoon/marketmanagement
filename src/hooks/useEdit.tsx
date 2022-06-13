/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import apiSwagger from '../models/apiSwagger.json';

interface inputValues {
  location: string;
  sold_date: string;
}

interface initValues {
  initialValue: inputValues;
  onSubmit: any;
}

export type paramsIp = {
  serial: string;
  location:string
};

export default function useEdit({ initialValue, onSubmit }: initValues) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [lists, setLists] = useState([] as any);
  const navigate = useNavigate();
  const { serial, location } = useParams<paramsIp>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setValues(values);
  };

  const loadEditData = async () => {
    try {
      const loadData = await axios.get(
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/confirm/${serial}/`,
      );
      setLists(loadData.data);
      console.log(loadData);
      
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleEditAxios = async () => {
    try {
      const loadData = await axios.put(
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/update/${serial}/`,
        {
          location: values.location,
          sold_date: values.sold_date,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(loadData);
      // loadData.data.location의 값을 navigate주소로 
      // if (loadData.data.location === 1) {
      //   alert('폐기가 완료되었습니다.');
      //   navigate('/list/1/');
      // } else if (loadData.data.location === 2) {
      //   navigate(`/list/${location}`);
      // }
    } catch (error: any) {
      setErrors(error);
      alert('등록정보를 다시 확인해주세요. 오류 지속시 관리자에게 문의 바랍니다.');
    }
  };

  useEffect(() => {
    if (submitting) {
      handleEditAxios();
      onSubmit(values);
    }
    setSubmitting(false);
  }, [submitting]);

  useEffect(() => {
    loadEditData();
  }, []);

  return {
    lists,
    values,
    errors,
    submitting,
    setValues,
    handleSubmit,
  };
}
