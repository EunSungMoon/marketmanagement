/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios, {AxiosError} from 'axios';
import apiSwagger from '../models/apiSwagger.json';

interface inputValues {
  product_name: string;
  location: string;
  unit: string;
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
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [product, setProduct] = useState([] as any);
  const [unit, setUnit] = useState([] as any);
  const [location, setLocation] = useState([] as any);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name !== undefined) {
      setValues({ ...values, [name]: value });
      console.log(values);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setValues(values);
  };

    const loadProductData = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/product`);
      setProduct(loadData.data);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  const loadUnitData = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/unit`);
      setUnit(loadData.data);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  const loadLocationData = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/location`);
      setLocation(loadData.data.slice(2));
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProductData();
    loadUnitData();
    loadLocationData();
    return () => setLoading(false);
  }, []);

  const handleError = (x: any) => {
    switch (x) {
      case 'amount':
        console.log('dd');
        break;
      case 'date':
        console.log('dd');
        break;
      case 'in_date':
        console.log('dd');
        break;
      case 'location':
        console.log('dd');
        break;
      case 'product_name':
        console.log('dd');
        break;
      case 'serial':
        console.log('dd');
        break;

      default:
        break;
    }
  };

  const handleAxios = async () => {
    try {
      const loadData = await axios.post(
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/add/`,
        {
          product_name: values.product_name,
          location: values.location,
          unit: values.unit,
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
      // if (loadData.status === 201) {
      //   navigate(`/confirm/${values.serial}/`);
      // }
      console.log(loadData.data);
    } catch (error: any) {
      setErrors(error);
      console.log(error.response.data);
      handleError(error.response.data);

      // const errorMsg=error.response.data;
      // if (errorMsg.date) {
      //   alert('유통기한을 입력해주세요.');
      // } else {
      //   alert(errorMsg.message);
      // }
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
    unit,
    location,
    error,
    setValues,
    handleChange,
    handleSubmit,
  };
}
