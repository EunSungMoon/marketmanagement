/* eslint-disable no-promise-executor-return */
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
  validate: any;
}

export default function useLogin({ initialValues, onSubmit, validate }: initValues) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({} as any);
  const [error, setError] = useState<AxiosError>();
  const [errorUser, setErrorUser] = useState(false); // 에러메세지 사라지게
  const [errorPassword, setErrorPassword] = useState(false);
  const [checkID, setCheckID] = useState(false); // 중복체크여부

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUniqueCheck(e);
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setValues(values);
    await new Promise((r) => setTimeout(r, 1000));
    setErrors(validate(errors));
  };

  const changeBtnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== values.username) {
      setCheckID(false);
    }
  };

  const handleUniqueCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (values.username === '') {
      setErrorUser(false);
    } else if (e.target.value === values.username) {
      setErrorUser(true);
    } else if (e.target.value === values.password) {
      setErrorPassword(true);
    }
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

  const handleCheckID = async () => {
    setErrorUser(true);
    try {
      const loadAxios = await axios.post(
        'http://15.164.62.156:8000/api/uniquecheck/',
        {
          username: values.username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (loadAxios.status === 200) {
        setCheckID(true);
      } else if (loadAxios.status === 202) {
        setCheckID(false);
      }
    } catch (error) {
      setCheckID(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
        handleAxiosSignup();
      }
    }
    setSubmitting(false);
  }, [errors]);

  return {
    values,
    submitting,
    error,
    errors,
    checkID,
    errorUser,
    errorPassword,
    handleChange,
    handleSubmit,
    handleLogout,
    handleCheckID,
    changeBtnName,
  };
}
