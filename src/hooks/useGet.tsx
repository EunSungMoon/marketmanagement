/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export default function useGetAxios(axiosParams: AxiosRequestConfig) {
  const [lists, setLists] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

  const handleGetAxios = async (params: AxiosRequestConfig) => {
    try {
      setLoading(true);
      const loadData = await axios.request(params);
      setLists(loadData.data);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetAxios(axiosParams);
    return () => setLoading(false);
  }, []);

  return {
    error,
    loading,
    lists,
  };
}
