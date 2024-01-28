import {
  FormControl,
  Container,
  Flex,
  Skeleton,
  Stack,
} from '@chakra-ui/react';

const LoadingForm = () => {
  const skeletonStack = [1, 2, 3, 4];
  return (
    <Container>
      <Flex flexDirection={'column'} justifyItems={'center'} gap={'8'}>
        <Skeleton height={'10'} w={'32'} borderRadius={'lg'} />

        <FormControl>
          <Flex flexDirection={'column'} gap={'4'}>
            {skeletonStack.map((skeleton) => {
              return (
                <Stack key={skeleton}>
                  <Skeleton height={'5'} w={'40'} borderRadius={'lg'} />
                  <Skeleton height={'10'} borderRadius={'lg'} />
                </Stack>
              );
            })}
            <Skeleton height={'10'} borderRadius={'lg'} />
          </Flex>
        </FormControl>
      </Flex>
    </Container>
  );
};

export default LoadingForm;
