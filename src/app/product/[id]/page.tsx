'use client';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Textarea,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ProductData } from '@/utils/product';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import { HiBackward } from 'react-icons/hi2';

const EditProduct = ({ params: { id } }: { params: { id: string } }) => {
  const { data, loading, error } = useFetch(
    `${process.env.API_URL}/product/${id}`
  );

  const detailProduct: ProductData[] = data;
  console.log(detailProduct);

  const toast = useToast();
  const router = useRouter();

  const handleEditProduct = async ({
    nama_produk,
    keterangan,
    harga,
    jumlah,
  }: ProductData) => {
    try {
      const response = await axios.put(`${process.env.API_URL}/product/${id}`, {
        nama_produk,
        keterangan,
        harga,
        jumlah,
      });

      if (response.status === 400 || response.status === 404) {
        throw new Error(`Http error status: ${response.status}`);
      }

      await response.data;

      toast({
        title: 'Berhasil edit produk',
        status: 'success',
        isClosable: true,
      });

      router.push('/');
    } catch (error) {
      return (error as Error).message;
    }
  };

  const addCommentSchema = Yup.object().shape({
    nama_produk: Yup.string()
      .min(3, 'Min 3 characters!')
      .max(25, 'Max 25 characters!')
      .required('Isi nama produk'),
    keterangan: Yup.string()
      .min(5, 'Min 5 characters!')
      .max(250, 'Max 250 characters!')
      .required('Isi keterangan produk'),
    harga: Yup.number().required('Isi harga produk'),
    jumlah: Yup.number().required('Isi jumlah produk'),
  });

  const formik = useFormik({
    initialValues: {
      nama_produk: '',
      keterangan: '',
      harga: 0,
      jumlah: 0,
    },
    onSubmit: (values) => {
      handleEditProduct(values);

      formik.resetForm();
    },
    validationSchema: addCommentSchema,
  });

  return (
    <>
      <Button
        onClick={() => router.back()}
        backgroundColor={'darkblue'}
        color={'white'}
      >
        <HiBackward size={30} /> Back
      </Button>
      <Center p={20}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl w={'lg'}>
            <GridItem>
              <Grid>
                <FormLabel>Nama Produk</FormLabel>
                <Input
                  type="text"
                  placeholder=""
                  name="nama_produk"
                  id="nama_produk"
                  value={formik.values.nama_produk}
                  onChange={formik.handleChange}
                />
              </Grid>

              <GridItem>
                <FormLabel>Keterangan</FormLabel>
                <Textarea
                  placeholder="Here is a sample placeholder"
                  name="keterangan"
                  id="keterangan"
                  value={formik.values.keterangan}
                  onChange={formik.handleChange}
                />
              </GridItem>

              <FormLabel>Harga</FormLabel>
              <Input
                type="number"
                placeholder="Isikan nama produk"
                name="harga"
                id="harga"
                value={formik.values.harga}
                onChange={formik.handleChange}
              />
              <FormLabel>Jumlah</FormLabel>
              <Input
                type="number"
                placeholder="Isikan nama produk"
                name="jumlah"
                id="jumlah"
                value={formik.values.jumlah}
                onChange={formik.handleChange}
              />
            </GridItem>
          </FormControl>

          <Button type="submit">Submit</Button>
        </form>
      </Center>
    </>
  );
};

export default EditProduct;
