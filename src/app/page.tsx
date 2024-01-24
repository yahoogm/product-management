'use client';

import { useFetch } from '@/hooks/useFetch';
import { HiTrash, HiPencil } from 'react-icons/hi';
import { ProductData } from '@/utils/product';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Center,
  HStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const {
    data: products,
    error,
    loading,
  } = useFetch(`${process.env.API_URL}/product`);

  const toast = useToast();
  const router = useRouter();

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
    <main>
      <Link href={'/product'}>
        <Button backgroundColor={'darkblue'} color={'white'}>
          Tambah produk
        </Button>
      </Link>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nama Produk</Th>
              <Th>Deskripsi</Th>
              <Th>Harga</Th>
              <Th>Jumlah</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((product: ProductData) => {
              return (
                <Tr key={product._id}>
                  <Td>{product.nama_produk}</Td>
                  <Td>{product.keterangan}</Td>
                  <Td>{product.harga}</Td>
                  <Td>{product.jumlah}</Td>
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
    </main>
  );
}
