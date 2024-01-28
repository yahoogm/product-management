import { tableHead } from '@/utils/table';
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
} from '@chakra-ui/react';
import Link from 'next/link';

const LoadingTable = () => {
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
            <Tr>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <HStack spacing={'10px'}>
                  <Skeleton height="50px" width={'50px'} />
                  <Skeleton height="50px" width={'50px'} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <HStack spacing={'10px'}>
                  <Skeleton height="50px" width={'50px'} />
                  <Skeleton height="50px" width={'50px'} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <HStack spacing={'10px'}>
                  <Skeleton height="50px" width={'50px'} />
                  <Skeleton height="50px" width={'50px'} />
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <Skeleton height="50px" />
              </Td>
              <Td>
                <HStack spacing={'10px'}>
                  <Skeleton height="50px" width={'50px'} />
                  <Skeleton height="50px" width={'50px'} />
                </HStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LoadingTable;
