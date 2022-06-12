/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import apiSwagger from '../models/apiSwagger.json';

interface inputValues {
  location: string;
  floor: string;
  open: string;
  open_date: string;
  extra: string;
}

interface initValues {
  initialValue: inputValues;
  onSubmit: any;
}

export type paramsIp = {
  serial: string;
};

export default function useEdit({ initialValue, onSubmit }: initValues) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { serial } = useParams<paramsIp>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name !== undefined) {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setValues(values);
  };

  const handleEditAxios = async () => {
    try {
      const loadData = await axios.put(
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/update/${serial}/`,
        {
          open: values.open,
          open_date: values.open_date,
          location: values.location,
          floor: values.floor,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (loadData.status === 200) {
        if (loadData.data.location === 1) {
          alert('폐기가 완료되었습니다.');
          navigate('/list/1/');
        } 
        // else {
        //   navigate(`/confirm/${serial}/`, { state: { data: 'update' } });
        // }
      }
    } catch (error: any) {
      setErrors(error);
      alert('등록정보를 다시 확인해주세요. 오류 지속시 관리자에게 문의 바랍니다.');
    }
  };

  useEffect(() => {
    if (submitting) {
      if ((values.open === '' && values.open_date) || (values.open && values.open_date === '')) {
        alert('개봉일자, 개봉 후 유통기한을 선택해주세요.');
      } else {
        handleEditAxios();
        onSubmit(values);
      }
    }
    setSubmitting(false);
  }, [submitting]);

  return {
    values,
    errors,
    submitting,
    setValues,
    handleChange,
    handleSubmit,
  };
}
