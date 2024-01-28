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
import { useDetailProduct } from '@/hooks/useDetailProduct';
import { useEffect } from 'react';
import LoadingForm from '@/components/common/LoadingForm';

const EditProduct = ({ params: { id } }: { params: { id: string } }) => {
  const toast = useToast();
  const router = useRouter();

  const { data, error, loading } = useDetailProduct(id);

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
    validationSchema: productSchema,
  });

  useEffect(() => {
    if (data && !loading) {
      formik.setValues({
        nama_produk: data.nama_produk,
        keterangan: data.keterangan,
        harga: data.harga,
        jumlah: data.jumlah,
      });
    }
  }, [data, loading]);

  if (error) return <div>error</div>;
  if (loading) return <LoadingForm />;

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
                Ubah
              </Button>
            </Flex>
          </form>
        </FormControl>
      </Flex>
    </Container>
  );
};

export default EditProduct;
