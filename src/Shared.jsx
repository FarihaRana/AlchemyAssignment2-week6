import { createContext, useContext, useState } from 'react';
const StateContext = createContext();

 function StateProvider({  children }) {
  const [userAddress, setUserAddress] = useState('');
  const [isMessageSigned, setIsMessageSigned] = useState(false);
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [tokenID, setTokenID] = useState();
  const [metaData, setMetaData] = useState([]);

  return (
    <StateContext.Provider
      value={{
        userAddress,
        setUserAddress,
        isMessageSigned,
        setIsMessageSigned,
        results,
        setResults,
        hasQueried,
        setHasQueried,
        tokenDataObjects,
        setTokenDataObjects,
        isLoading,
        setIsLoading,
        error,
        setError,
        contractAddress, 
        setContractAddress,
        tokenID, 
        setTokenID,
        metaData, 
        setMetaData
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

function useAppState() {
  return useContext(StateContext);
}

export { StateProvider, useAppState };
