import {ChakraProvider, Heading, Flex, } from '@chakra-ui/react';
import { BrowserRouter as Router,Routes, Route, NavLink} from 'react-router-dom';
import { MetaComp } from './MetaComp';
import { Owner } from './Owner';

function App() {

  return (
    <Router>
       <ChakraProvider>
      <Flex display="flex" alignItems="center" columnGap={8} w="100vw" p={8}  textShadow="1px 1px #ffff11" align="center" justify="center" fontSize={29} textDecoration="underline" boxShadow='lg' rounded='md' bg='white'>
            <NavLink to="/" >
              Owner-NFTs
            </NavLink>
            <NavLink to="/owner">
              NFT-Metdata
            </NavLink>
      </Flex>
      <Flex display="flex" alignItems="center" w="100vw" p={2}  textShadow="1px 1px #ffff11" align="center" justify="center" fontSize={29}>
      <Heading fontSize="6xl" mt={5} textShadow="1px 1px #ffff11" >
              NFT Indexer 🖼
        </Heading>
      </Flex>
      <Routes>
        <Route path="/" element={<Owner />} />
        <Route path="/owner" element={<MetaComp />} />
      </Routes>
    </ChakraProvider>
  </Router>
  );
}

export default App;
