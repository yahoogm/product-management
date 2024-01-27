import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
  Container,
  Center,
} from '@chakra-ui/react';
import Link from 'next/link';

const ErrorTable = () => {
  return (
    <Container maxW={'7xl'}>
      <Flex justifyContent={'end'} py={'4'}>
        <Link href={'/product'}>
          <Button backgroundColor={'#B19470'} textTransform={'capitalize'}>
            Tambah Produk
          </Button>
        </Link>
      </Flex>
      <TableContainer backgroundColor={'#43766C'} py={'6'} borderRadius={'md'}>
        <Table variant="simple" size={'md'}>
          <Thead>
            <Tr>
              <Th color={'#B19470'} fontSize={'md'}>
                Nama Produk
              </Th>
              <Th color={'#B19470'} fontSize={'md'}>
                Deskripsi
              </Th>
              <Th color={'#B19470'} fontSize={'md'}>
                Harga
              </Th>
              <Th color={'#B19470'} fontSize={'md'}>
                Jumlah
              </Th>
              <Th color={'#B19470'} fontSize={'md'}>
                Aksi
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={5} borderBottom={'none'}>
                <Center color={'white'}>Tidak ada produk</Center>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ErrorTable;
