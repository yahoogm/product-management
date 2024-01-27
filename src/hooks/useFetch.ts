import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (initialUrl: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!initialUrl) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(initialUrl);
        if (response.status === 400 || response.status === 404) {
          setError(true);
          throw new Error(`HTTP Error status: ${response.status}`);
        }

        const json = await response.data;
        setData(json);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        throw (error as Error).message;
      }
    };

    fetchData();
  }, [initialUrl, options]);

  return { data, loading, error };
};
