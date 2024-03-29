'use client';

import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
  Container,
  Flex,
  Box,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import axios from 'axios';
import { ProductData } from '@/utils/product';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { HiBackward } from 'react-icons/hi2';
import { productSchema } from '@/libs/validation';

const Product = () => {
  const toast = useToast();
  const router = useRouter();

  const handleAddProduct = async ({
    nama_produk,
    keterangan,
    harga,
    jumlah,
  }: ProductData) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/product`, {
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
        title: 'Berhasil menambahkan produk',
        status: 'success',
        isClosable: true,
      });

      router.push('/');
    } catch (error) {
      return (error as Error).message;
    }
  };

  const formik = useFormik({
    initialValues: {
      nama_produk: '',
      keterangan: '',
      harga: 0,
      jumlah: 0,
    },
    onSubmit: (values) => {
      handleAddProduct(values);

      formik.resetForm();
    },
    validationSchema: productSchema,
  });
  return (
    <Container>
      <Flex flexDirection={'column'} justifyItems={'center'} gap={'8'}>
        <Button
          onClick={() => router.back()}
          colorScheme="blue"
          color={'white'}
          w={'32'}
        >
          <HiBackward size={30} /> Back
        </Button>

        <FormControl>
          <form onSubmit={formik.handleSubmit}>
            <Flex flexDirection={'column'} gap={'4'}>
              <Box>
                <FormLabel>Nama Produk</FormLabel>
                <Input
                  type="text"
                  placeholder="Isikan nama produk"
                  name="nama_produk"
                  id="nama_produk"
                  value={formik.values.nama_produk}
                  onChange={formik.handleChange}
                />
                {formik.touched.nama_produk && formik.errors.nama_produk ? (
                  <Text
                    fontSize={'small'}
                    color={'red'}
                    textTransform={'lowercase'}
                  >
                    {formik.errors.nama_produk}
                  </Text>
                ) : null}
              </Box>

              <Box>
                <FormLabel>Keterangan</FormLabel>
                <Textarea
                  placeholder="Isikan keterangan produk"
                  name="keterangan"
                  id="keterangan"
                  value={formik.values.keterangan}
                  onChange={formik.handleChange}
                />
                {formik.touched.keterangan && formik.errors.keterangan ? (
                  <Text
                    fontSize={'small'}
                    color={'red'}
                    textTransform={'lowercase'}
                  >
                    {formik.errors.keterangan}
                  </Text>
                ) : null}
              </Box>

              <Box>
                <FormLabel>Harga</FormLabel>
                <Input
                  type="number"
                  placeholder="Isikan harga produk"
                  name="harga"
                  id="harga"
                  value={formik.values.harga}
                  onChange={formik.handleChange}
                />
                {formik.touched.harga && formik.errors.harga ? (
                  <Text
                    fontSize={'small'}
                    color={'red'}
                    textTransform={'lowercase'}
                  >
                    {formik.errors.harga}
                  </Text>
                ) : null}
              </Box>

              <Box>
                <FormLabel>Jumlah</FormLabel>
                <Input
                  type="number"
                  placeholder="Isikan jumlah produk"
                  name="jumlah"
                  id="jumlah"
                  value={formik.values.jumlah}
                  onChange={formik.handleChange}
                />
                {formik.touched.jumlah && formik.errors.jumlah ? (
                  <Text
                    fontSize={'small'}
                    color={'red'}
                    textTransform={'lowercase'}
                  >
                    {formik.errors.jumlah}
                  </Text>
                ) : null}
              </Box>

              <Button type="submit" colorScheme="green">
                Submit
              </Button>
            </Flex>
          </form>
        </FormControl>
      </Flex>
    </Container>
  );
};

export default Product;
