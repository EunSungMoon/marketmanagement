/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import apiSwagger from '../models/apiSwagger.json';
import CollapseTableComponent, {paramsIp} from '../component/CollapseTableComponent';

export default function SearchBoard() {
  const { values } = useParams<paramsIp>();
  const [lists, setLists] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

  const handleAxios = async () => {
    try {
      setLoading(true);
      const loadData = await axios.get(`${apiSwagger.url}:${apiSwagger.port}/${apiSwagger.api}/board/search/${values}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLists(loadData.data);
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleAxios();
  }, [values]);

  if (error) return <div>에러가 발생했습니다.</div>;
  if (loading) return null;

  return (
    <main id="board" className="container">
      <CollapseTableComponent lists={lists} condition={lists.length === 0} />
    </main>
  );
}