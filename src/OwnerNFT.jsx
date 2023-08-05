import { Alchemy , Network} from 'alchemy-sdk';
import { useAppState } from './Shared';
export function OwnerNFT() {
    const {
        userAddress,
        setResults,
        setHasQueried,
        setTokenDataObjects,
        setIsLoading,
        setError,
      } = useAppState();

  function isENSName(inputStr) {
    const ensPattern = /^[a-zA-Z0-9-\.]+$/;
    return ensPattern.test(inputStr);
  }
  
    async function getNFTsForOwner() {
      try{
        const config = {
          apiKey: 'vxtPxiF6p-8fM1gowlAC19ZK9qOw3jWa',
          network: Network.ETH_MAINNET,
        };
        const alchemy = new Alchemy(config);
        setIsLoading(true); 
        let data;
        if(isENSName(userAddress)){
           const address = await  alchemy.core.resolveName(userAddress);
          data = await alchemy.nft.getNftsForOwner(address);
          setResults(data);
        }
        else{
          data = await alchemy.nft.getNftsForOwner(userAddress);
          setResults(data);
        }
  
      const tokenDataPromises = [];
      for (let i = 0; i < data.ownedNfts.length; i++) {
        const tokenData = alchemy.nft.getNftMetadata(
         data.ownedNfts[i].contract.address,
        data.ownedNfts[i].tokenId,
        );
        tokenDataPromises.push(tokenData);
      }
  
      setTokenDataObjects(await Promise.all(tokenDataPromises));
      setHasQueried(true);
      setIsLoading(false);
    }catch(error){
      console.log(error)
      setError(error);
    } 
    }
          
  return {
    getNFTsForOwner,
    userAddress,
    setResults,
    setHasQueried,
    setTokenDataObjects,
    setIsLoading,
    setError,
  };
}
