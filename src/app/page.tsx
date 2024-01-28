'use client';

import { useFetch } from '@/hooks/useFetch';
import { HiTrash, HiPencil } from 'react-icons/hi';
import { ProductData, formatNumber, formatToRupiah } from '@/utils/product';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  HStack,
  Button,
  useToast,
  Container,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingTable from '@/components/common/LoadingTable';
import ErrorTable from '@/components/common/ErrorTable';
import Link from 'next/link';
import { tableHead } from '@/utils/table';

export default function Home() {
  const toast = useToast();
  const router = useRouter();

  const {
    data: products,
    error,
    loading,
  } = useFetch(`${process.env.API_URL}/product`);

  if (error) return <ErrorTable />;
  if (loading) return <LoadingTable />;

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await axios.delete(`${process.env.API_URL}/product`, {
        params: { id },
      });

      if (response.status === 400 || response.status === 404) {
        throw new Error(`Http error status: ${response.status}`);
      }

      await response.data;
      toast({
        title: 'Berhasil menghapus produk',
        status: 'success',
        isClosable: true,
      });

      window.location.reload();
    } catch (error) {}
  };

  return (
    <Container maxW={'7xl'}>
      <Flex justifyContent={'end'} py={'4'}>
        <Link href={'/product'}>
          <Button backgroundColor={'#B19470'} textTransform={'capitalize'}>
            Tambah produk
          </Button>
        </Link>
      </Flex>
      <TableContainer backgroundColor={'#43766C'} py={'6'} borderRadius={'md'}>
        <Table variant="simple" size={'md'}>
          <Thead>
            <Tr>
              {tableHead.map((th) => {
                return (
                  <Th color={'#F8FAE5'} fontSize={'md'} key={Math.random()}>
                    {th}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((product: ProductData) => {
              return (
                <Tr key={product._id}>
                  <Td color={'white'}>{product.nama_produk}</Td>
                  <Td color={'white'}>{product.keterangan}</Td>
                  <Td color={'white'}>{`Rp. ${formatToRupiah(
                    product.harga
                  )}`}</Td>
                  <Td color={'white'}>{formatNumber(product.jumlah)}</Td>
                  <Td>
                    <HStack spacing={'10px'}>
                      <Button
                        onClick={() => handleDeleteProduct(product._id || '')}
                      >
                        <HiTrash color="red" size={25} />
                      </Button>
                      <Button
                        onClick={() => router.push(`/product/${product._id}`)}
                      >
                        <HiPencil color="green" size={25} />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
