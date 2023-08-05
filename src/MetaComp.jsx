import {List, SimpleGrid, ListItem,Box, Button, Flex, Heading, Image, Input, Text } from '@chakra-ui/react';
import { MetaData } from "./Metadata";
import { useAppState } from './Shared';


export function MetaComp(){

    const {
        setError,
        hasQueried,
        isLoading,
        error,
        contractAddress, 
        setContractAddress,
        tokenID,
        setTokenID,
        metaData, 
        setMetaData,
        setHasQueried,
        setIsLoading
      } = useAppState();

      const {
        fetchMetaData,
      } = MetaData()    

    const imageUrl = metaData?.rawMetadata?.image;
    console.log(imageUrl)



// const attributes = metaData?.rawMetadata?.attributes;
// const arrayAttribute = []

// if (attributes && Array.isArray(attributes)) {
//   for (let i = 0; i < attributes.length; i++) {
//     const trait_type = attributes[i].trait_type;
//     const value = attributes[i].value;
//     console.log(value);
//     console.log(trait_type);
//     arrayAttribute.push()
//   }
// }   
  
    function resetData() {
      setError(null);
      setIsLoading(false)
      setContractAddress('')
      setTokenID('')
      setMetaData([])
      setHasQueried(false)
    }

    return (
      <Box w="100vw" p={8}>
      <Flex  flexDirection="row" alignItems="flex-start" justifyContent="space-between">
        <Flex flexDirection="column" alignItems="center" boxShadow="lg" p={8} borderRadius="md" bgColor="white">
        <Text fontSize="20" fontWeight="bolder" textAlign="center" mb={2}>
          Get Metdata of NFTs
        </Text>
          <Input
            placeholder="Contract Address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            color="black"
            w="500px"
            textAlign="center"
            p={10}
            bgColor="white"
            fontSize="xl"
            mb={4}
          />
          <Input
            placeholder="Token ID"
            value={tokenID}
            onChange={(e) => setTokenID(e.target.value)}
            color="black"
            w="400px"
            textAlign="center"
            p={10}
            bgColor="white"
            fontSize="xl"
            mb={4}
          />
          {!isLoading ? (
            <Button
              size="lg"
              onClick={fetchMetaData}
              bgColor="black"
              color="white"
              _hover={{ bgColor: "black.600" }}
              disabled={!contractAddress}
              mt={4}
            >
              Fetch NFT MetaData
            </Button>
          ) : error ? (
            <Heading as="h3" size="md" mt={18} color="red">
              Some Error Occurred
            </Heading>
          ) : (
            <Heading as="h3" size="md" mt={18} color="green">
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

          <Flex  ml="10" flexDirection="column" alignItems="center" flex={1}  justifyContent="space-between">
      { !hasQueried? (
            <Heading>Data will appear here</Heading>
          ) : null}
        {hasQueried && metaData.contract && !isLoading ? ( 
            <SimpleGrid w="100%" ml="8" columns={2} spacing={8}  boxShadow="lg" p={8} borderRadius="md" bgColor="white" >     
            <Flex w="100%" display= 'flex'  flexDir="column" alignItems="flex-start"  >
              <List styleType="none" p={0} m={0}>
                <ListItem mb={4}>
                  <b>Contract Address:</b> {metaData.contract?.address}
                </ListItem>
                <ListItem mb={4}>
                  <b>Project Name:</b> {metaData.contract?.name}
                </ListItem>
                <ListItem mb={4}>
                  <b>Symbol:</b> {metaData.contract?.symbol}
                </ListItem>
                <ListItem mb={4}>
                  <b>Contract Deployer:</b> {metaData.contract?.contractDeployer}
                </ListItem>
                <ListItem mb={4}>
                  <b>Deployed Block Number:</b> {metaData.contract?.deployedBlockNumber}
                </ListItem>
                <ListItem mb={4}>
                  <b>Token Type:</b> {metaData.tokenType}
                </ListItem>
                <ListItem mb={4}>
                  <b>Title:</b> {metaData.title}
                </ListItem>
                 <ListItem>
                  <b>Token URI:</b> {metaData.tokenUri?.gateway}
                </ListItem>
              </List>
            </Flex>
            <Flex
            ml="60px"
            flexDir="column"
            color="black"
            justifyContent="center"
            alignItems="center"
            w="50%"  
            h="50%"
            borderRadius="8px"
            boxShadow="0 4px 8px rgba(0, 0, 0, .8)"
                > <Image
                src={imageUrl ?? "https://via.placeholder.com/200"}
                alt="Image"
                  h="99%"
                  w="99%"
                borderRadius="8px"
              /></Flex>
            </SimpleGrid>   
        ) : null}
        </Flex>  
      </Flex>
    </Box>  
  );
};

