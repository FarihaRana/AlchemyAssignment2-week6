import { Box,  Flex, Text, Input, Button, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import {  Metamask } from './Metamask'; 
import {   OwnerNFT } from './OwnerNFT';
import { useAppState } from './Shared';
export function Owner() {

  const {
    userAddress,
    setUserAddress,
    isMessageSigned,
    results,
    hasQueried,
    tokenDataObjects,
    isLoading,
    error,
  } = useAppState();

  const {
    connectToMetamask,
    disconnectMetamask,
    resetData,
  } = Metamask();

  const {
    getNFTsForOwner,
  } = OwnerNFT();

  console.log(tokenDataObjects)
  console.log("result" + results)
  return (
    <Box w="100vw" p={8}>
    <Flex flexDirection="row" alignItems="flex-start" justifyContent="space-between">
      <Flex flexDirection="column" alignItems="center" boxShadow="lg" p={8} borderRadius="md" bgColor="white">
        <Text fontSize="20" fontWeight="bolder" textAlign="center" mb={2}>
          Get all the NFTs an address holds
        </Text>
  
        <Input
          value={userAddress}
          placeholder="ENS / Address"
          onChange={(e) => setUserAddress(e.target.value)}
          color="black"
          w="600px"
          textAlign="center"
          p={10}
          bgColor="white"
          fontSize="xl"
        />
  
        {!isMessageSigned ? (
          <Button
            size="lg"
            onClick={connectToMetamask}
            mt={18}
            bgColor="black"
            color="white"
            _hover={{ bgColor: "black.600" }}
          >
            Connect Metamask
          </Button>
        ) : userAddress && (
          <Button
            size="lg"
            onClick={disconnectMetamask}
            mt={18}
            bgColor="black"
            color="white"
            _hover={{ bgColor: "black.600" }}
          >
            Disconnect Metamask
          </Button>
        )}
  
        {!isLoading ? (
          <Button
            size="lg"
            onClick={getNFTsForOwner}
            mt={18}
            bgColor="black"
            color="white"
            _hover={{ bgColor: "black.600" }}
            disabled={!userAddress}
          >
            Fetch NFTs
          </Button>
        ) : error ? (
          <Heading as="h3" size="md" mt={30} color="red">
            Some Error Occurred
          </Heading>
        ) : (
          <Heading as="h3" size="md" mt={30} color="green">
            Fetching
          </Heading>
        )}
  
        <Button
          size="lg"
          onClick={resetData}
          mt={18}
          bgColor="black"
          color="white"
          _hover={{ bgColor: "black.600" }}
        >
          Reset Data
        </Button>
      </Flex>
      
      <Flex flexDirection="column" alignItems="center" flex={1}>
      { !hasQueried? (
            <Heading>NFTs will appear here</Heading>
          ) : null}
        {hasQueried && results.ownedNfts && !isLoading ? (
          <SimpleGrid w="46vw" columns={3} spacing={6}>
            {results.ownedNfts.map((e, i) => {
              return (
                <Flex
                  flexDir="column"
                  color="black"
                  key={e.id}
                  justifyContent="center"
                  alignItems="center"
                  h="200px"
                  w="200px"
                  borderRadius="8px"
                  boxShadow="0 4px 8px rgba(0, 0, 0, .8)"
                >
                
                  <Box justifyContent="center" alignItems="center">
                    <b>
                      {tokenDataObjects[i].title?.length === 0 ? "No Name" : tokenDataObjects[i].title}
                    </b>
                  </Box>
                  <Image
                    w="10vw"
                    h="10vw"
                    src={
                      tokenDataObjects[i]?.rawMetadata?.image ??
                      "https://via.placeholder.com/200"
                    }
                    alt="Image"
                  />
                </Flex>
              );
            })}
          </SimpleGrid>
        ) : null}
      </Flex>
    </Flex>
  </Box>
);
};

export default Owner;
