/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios, { AxiosError } from 'axios';
import apiSwagger from '../models/apiSwagger.json';

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
  const [loading, setLoading] = useState(false);
  const [uniqueCheck, setUniqueCheck] = useState<boolean>(false);
  const [uniqueCheckMsg, setUniqueCheckMsg] = useState<string>('');
  const [passwordCheckMsg, setPasswordCheckMsg] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [passwordMatchCheck, setPasswordMatchCheck] = useState('');

  const [disappearMsg, setDisappearMsg] = useState(false); // 에러메세지 사라지게

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
  };

  const changeBtnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== values.username) {
      setUniqueCheck(false);
    }
  };

  const handleUniqueCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (values.username === '') {
      setDisappearMsg(false);
    } else if (e.target.value === values.username) {
      setDisappearMsg(true);
    }
  };

  const handlePasswordChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoMatchPassword(e.target.value !== values.password);
    setPasswordMatchCheck(e.target.value);
  };

  const handleAxiosSignup = async () => {
    try {
      setLoading(true);
      const loadAxios = await axios.post(
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/user/register/`,
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
        setPasswordCheck(false);
        navigate('/');
      }
    } catch (error: any) {
      setError(error);
      setPasswordCheck(true);
      setPasswordCheckMsg(error.response.data.password[0]);
    }
  };

  const handleCheckID = async () => {
    setDisappearMsg(true);
    try {
      const loadAxios = await axios.post(
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/user/unique/`,
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
        setUniqueCheckMsg(loadAxios.data.message);
        setUniqueCheck(true);
      }
    } catch (error: any) {
      setUniqueCheckMsg(error.response.data.username[0]);
      setUniqueCheck(false);
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
      setSubmitting(false);
    }
    return () => setLoading(false);
  }, [onSubmit]);

  return {
    values,
    submitting,
    error,
    disappearMsg,
    errorPassword,
    uniqueCheck,
    uniqueCheckMsg,
    passwordCheckMsg,
    passwordCheck,
    noMatchPassword,
    handleChange,
    handleSubmit,
    handleLogout,
    handleCheckID,
    changeBtnName,
    handlePasswordChk
  };
}
