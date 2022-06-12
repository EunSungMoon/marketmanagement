/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios, { AxiosError } from 'axios';
import apiSwagger from '../models/apiSwagger.json';

interface inputValues {
  product_name: string;
  location: string;
  serial: string;
  amount: string;
  in_date: string;
  date: string;
}

interface initValues {
  initialValue: inputValues;
  onSubmit: any;
}

export default function useAdd({ initialValue, onSubmit }: initValues) {
  const [values, setValues] = useState(initialValue);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState<AxiosError>();
  const [product, setProduct] = useState([] as any);
  const [location, setLocation] = useState([] as any);

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

  const loadProductData = async () => {
    try {
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/product`);
      setProduct(loadData.data);
    } catch (error: any) {
      setError(error);
    }
  };

  const loadLocationData = async () => {
    try {
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/location`);
      setLocation(loadData.data.slice(2));
      
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    loadProductData();
    loadLocationData();
  }, []);

  const handleAxios = async () => {
    try {
      const loadData = await axios.post(
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/add/`,
        {
          product_name: values.product_name,
          location: values.location,
          serial: values.serial,
          amount: values.amount,
          in_date: values.in_date,
          date: values.date,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (loadData.status === 201) {
        navigate(`/confirm/${values.serial}/`);
      }
    } catch (error: any) {
      const errorMsg = error.response.data;
      if (errorMsg.product_name) {
        alert('품목명을 확인해주세요.');
      }
      if (errorMsg.location) {
        alert('분류를 확인해주세요.');
      }
      if (errorMsg.serial) {
        alert('입고번호를 확인해주세요.');
      }
      if (errorMsg.amount) {
        alert('수량을 확인해주세요.');
      }
      if (errorMsg.in_date) {
        alert('입고일을 확인해주세요.');
      }
      if (errorMsg.date) {
        alert('유통기한을 확인해주세요.');
      }
    }
  };

  useEffect(() => {
    if (submitting) {
      handleAxios();
      onSubmit(values);
    }
    setSubmitting(false);
  }, [submitting]);

  return {
    values,
    submitting,
    product,
    location,
    error,
    setValues,
    handleChange,
    handleSubmit,
  };
}
