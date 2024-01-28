'use client';

import { useFetch } from '@/hooks/useFetch';
import { useState } from 'react';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure,
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );

  const {
    data: products,
    error,
    loading,
    fetchData,
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

      fetchData();
      setProductIdToDelete(null);
    } catch (error) {
      toast({
        title: 'Gagal menghapus produk',
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={'7xl'}>
      <Flex justifyContent={'end'} py={'4'}>
        <Link href={'/product'}>
          <Button colorScheme="blue" textTransform={'capitalize'}>
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
                        onClick={() => {
                          onOpen();
                          setProductIdToDelete(product._id || '');
                        }}
                      >
                        <HiTrash color="red" size={25} />
                      </Button>

                      <Modal
                        isOpen={isOpen && productIdToDelete === product._id}
                        onClose={onClose}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader textTransform={'capitalize'}>
                            hapus produk
                          </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            Apakah anda yakin ingin menghapus produk?
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme="blue"
                              mr={3}
                              onClick={() => {
                                onClose();
                                setProductIdToDelete(null);
                              }}
                              textTransform={'capitalize'}
                            >
                              batal
                            </Button>
                            <Button
                              colorScheme="red"
                              textTransform={'capitalize'}
                              onClick={() =>
                                handleDeleteProduct(product._id || '')
                              }
                            >
                              hapus
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
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
