/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface validateValues {
  username: string;
  password: string;
}

export interface initValues {
  initialValues: validateValues;
  onSubmit: any;
}

export default function useJoin({ initialValues, onSubmit }: initValues) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
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
      const loadAxios = await axios.post(
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
      // if (loadAxios.status === 200) {
      //   setLoginFail(false);
      //   localStorage.setItem('token', loadAxios.data.token)
      // }
      console.log(loadAxios);
      localStorage.setItem('token', loadAxios.data.token);
    } catch (error: any) {
      setLoginFail(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // document.location.href = '/'
  };

  useEffect(() => {
    if (submitting) {
      handleAxiosLogin();
      onSubmit(values);
    }
    setSubmitting(false);
  }, [submitting]);

  return {
    values,
    submitting,
    loginFail,
    handleChange,
    handleSubmit,
    handleLogout,
  };
}
