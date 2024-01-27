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
  Container,
  Skeleton,
  Center,
} from '@chakra-ui/react';

const ErrorTable = () => {
  return (
    <Container
      maxW={'7xl'}
      mt={'20'}
      backgroundColor={'#43766C'}
      py={'6'}
      borderRadius={'md'}
    >
      <Flex alignItems={'end'}>
        <a href={'/product'}>
          <Button backgroundColor={'#F8FAE5'}>Tambah produk</Button>
        </a>
      </Flex>
      <TableContainer>
        <Table variant="simple" size={'md'}>
          <Thead>
            <Tr>
              <Th color={'#B19470'}>Nama Produk</Th>
              <Th color={'#B19470'}>Deskripsi</Th>
              <Th color={'#B19470'}>Harga</Th>
              <Th color={'#B19470'}>Jumlah</Th>
              <Th color={'#B19470'}>Aksi</Th>
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
