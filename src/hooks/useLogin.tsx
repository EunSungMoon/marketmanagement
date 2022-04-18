/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

export interface validateValues {
  username: string;
  password: string;
}

export interface initValues {
  initialValues: validateValues;
  onSubmit: any;
}

export default function useLogin({ initialValues, onSubmit }: initValues) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [loginFail, setLoginFail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setValues(values);
  };

  const handleAxiosLogin = async () => {
    try {
      const loadData = await axios.post(
        'http://15.164.62.156:8000/api/login/',
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
      if (loadData.status === 200) {
        sessionStorage.setItem('token', loadData.data.token);
        setLoginFail(false);
        window.location.replace('/');
      }
    } catch (error: any) {
      setError(error);
      setLoginFail(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    // document.location.href = '/'
  };

  useEffect(() => {
    if (submitting) {
      onSubmit(values);
      handleAxiosLogin();
    }
    setSubmitting(false);
  }, [submitting]);

  return {
    values,
    submitting,
    error,
    loginFail,
    handleChange,
    handleSubmit,
    handleLogout,
  };
}
