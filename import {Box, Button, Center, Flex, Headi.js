import {Box, Button, Center, Flex, Heading, Image, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import {  Metamask } from './src/Metamask';
import {   OwnerNFT } from './src/OwnerNFT';
import { useAppState } from './src/Shared';
import { MetaComp } from './src/MetaComp';

function App() {

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

  return (
    <Box w="100vw" p={8}>
     <BrowserRouter>
      <Center>
        <Flex
          alignItems={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
           <Heading  fontSize={66} as="h1" size="xl" mb={0} mt={10}>
            NFT Indexer 🖼  
          </Heading>
          <Text fontSize="lg" textAlign="center" mb={4}>
            Plug in an address and this website will return all of its NFTs!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
        boxShadow="lg"
        p={8}
        borderRadius="md"
        bgColor="white"
      >
        <Heading as="h2" size="md" mb={18}>
          Connect your Metamask address / ENS or manually input one:
        </Heading>
        <Input
        value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          color="black"
          w="400px"
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
            _hover={{ bgColor: 'black.600' }}
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
            _hover={{ bgColor: 'black.600' }}
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
            _hover={{ bgColor: 'black.600' }}
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
          _hover={{ bgColor: 'black.600' }}
        >
          Reset Data
        </Button>


        {hasQueried  &&  results.ownedNfts && !isLoading? ( <Heading as="h2" size="lg" my={18}>
          Here are Your NFTs
        </Heading>) : null}

        {isLoading ? (<Heading as="h2" size="lg" my={18}>while making query it may take few seconds to fetch data...</Heading>) : null }

        {hasQueried &&  results.ownedNfts && !isLoading? (
          <SimpleGrid w={'60vw'} columns={4} spacing={24}>
            {results.ownedNfts.map((e, i) => {
              return (
                <Flex
       flexDir={'column'}
        color="black"
        key={e.id}
        justifyContent="center" alignItems="center"
        h="200px"
        w="200px"
       borderRadius="8px"
       boxShadow="0 4px 8px rgba(0, 0, 0, .8);" 
                >
                  <Box justifyContent="center" alignItems="center">
                    <b>{' '}
                    {tokenDataObjects[i].title?.length === 0
                      ? 'No Name'
                      : tokenDataObjects[i].title} </b>
                  </Box>
                  <Image w={'10vw'} h={'10vw'}
                    src={
                      tokenDataObjects[i]?.rawMetadata?.image ??
                      'https://via.placeholder.com/200'
                    }
                    alt={'Image'}
                  />
                </Flex>
              )
            })}
          </SimpleGrid>
        ) :
         null
        }
          <Box> 
          <Link  exact="true" to="/balance">
                Check MetaData
              </Link>
          </Box>
              
      <Routes>
        <Route  exact="true" path="/balance" element={MetaComp} />
      </Routes>   
      </Flex>
      </BrowserRouter>
    </Box>
  
  );
}

export default App;
