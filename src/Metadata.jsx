
import { Alchemy, Network} from 'alchemy-sdk';
import { useAppState } from './Shared';

export function MetaData(){
    const {
        contractAddress, 
        tokenID, 
        setMetaData,
        setError,
        setHasQueried,
        setIsLoading,
      } = useAppState();
   async function fetchMetaData(){
    try{
      const config = {
        apiKey: '',
        network: Network.ETH_MAINNET,
      };     
      const alchemy = new Alchemy(config);
        setIsLoading(true); 
        let response =  await alchemy.nft.getNftMetadata(contractAddress, tokenID)
        setMetaData(response);
        setHasQueried(true);
       setIsLoading(false);
   }catch(error){
     setError(error)
   }
   }
   return{
    fetchMetaData,
    contractAddress, 
    tokenID, 
    setMetaData,
    setError,
    setHasQueried,
    setIsLoading,
   }
}

