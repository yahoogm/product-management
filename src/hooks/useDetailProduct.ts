import { ProductData } from '@/utils/product';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useDetailProduct = (idProduct: string) => {
  const [data, setData] = useState<ProductData | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.API_URL}/product/${idProduct}`
      );
      if (response.status === 400 || response.status === 404) {
        setError(true);
        throw new Error(`HTTP Error status: ${response.status}`);
      }

      const json = (await response.data.data) as ProductData;
      setData(json);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      throw (error as Error).message;
    }
  }, [idProduct]);

  useEffect(() => {
    if (!idProduct) return undefined;

    fetchData();
  }, [idProduct, fetchData]);

  return { data, loading, error, fetchData };
};
