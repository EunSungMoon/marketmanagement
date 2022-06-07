/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiSwagger from '../models/apiSwagger.json';

interface inputValues {
  start: string;
  end: string;
}

interface initValues {
  initialValue: inputValues;
  onSubmit: any;
}

export default function useDateFilter({ initialValue, onSubmit }: initValues) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [lists, setLists] = useState([] as any);

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
        `${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/revenue/`,
        {
          start: values.start,
          end: values.end,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setLists(loadData.data);
    } catch (error: any) {
      setErrors(error);
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
    lists,
    setValues,
    handleChange,
    handleSubmit,
  };
}
