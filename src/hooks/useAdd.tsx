/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import apiSwagger from '../models/apiSwagger.json';

interface inputValues {
  reagent_name: string;
  serial: string;
  date: string;
  location: string;
  company: string;
  cat_no: string;
  amount: string;
  floor: string;
  owner: string;
  confirmer: string;
  condition: string;
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

  const handleAxios = async () => {
    try {
      const loadData = await axios.post(
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/add/`,
        {
          reagent_name: values.reagent_name,
          serial: values.serial,
          date: values.date,
          location: values.location,
          company: values.company,
          cat_no: values.cat_no,
          amount: values.amount,
          floor: values.floor,
          owner: values.owner,
          confirmer: values.confirmer,
          condition: values.condition,
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
      setErrors(error);
      const errorMsg=error.response.data;
      if (errorMsg.date) {
        alert('유통기한을 입력해주세요.');
      } else {
        alert(errorMsg.message);
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
    errors,
    submitting,
    setValues,
    handleChange,
    handleSubmit,
  };
}
