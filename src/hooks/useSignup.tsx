/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios, { AxiosError } from 'axios';

export interface validateValues {
  username: string;
  password: string;
  passwordCheck: string;
}

export interface initValues {
  initialValues: validateValues;
  onSubmit: any;
}

export default function useLogin({ initialValues, onSubmit }: initValues) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<AxiosError>();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setValues(values);
  };

  const handleAxiosSignup = async () => {
    try {
      const loadAxios = await axios.post(
        'http://15.164.62.156:8000/api/register/',
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (loadAxios.status === 201) {
        alert('회원가입 성공');
        navigate('/');
      }
    } catch (error: any) {
      setError(error);
      alert('회원가입에 실패했습니다');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    if (submitting) {
      onSubmit(values);
      handleAxiosSignup();
    }
    setSubmitting(false);
  }, [submitting]);

  return {
    values,
    submitting,
    error,
    handleChange,
    handleSubmit,
    handleLogout,
  };
}
