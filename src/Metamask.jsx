// import { useState } from 'react';
import { ethers } from 'ethers';
import { useAppState } from './Shared';
export function Metamask() {
    const {
        setUserAddress,
        setIsMessageSigned,
        setHasQueried,
        setTokenDataObjects,
        setIsLoading,
        setError,
      } = useAppState();

  async function connectToMetamask() {
   if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const message = 'I am signing this message to connect.';
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = provider.getSigner(accounts[0]); 
          const signature = await signer.signMessage(message);
          const address = await signer.getAddress();
          setUserAddress(address);
          setIsMessageSigned(true);
        } 
      } catch (error) {
        setError(error);
        console.error('Error connecting to Metamask:', error);
      }
    } else {
      setError('Metamask extension not found. Please install Metamask and try again.');
      console.error('Metamask extension not found.');
    }
  }

  function disconnectMetamask() {
    if (window.ethereum) {
            window.ethereum = null;
            setUserAddress('');
            setIsMessageSigned(false);
  }
  }
  function resetData() {
    setUserAddress('');
    setError(null);
    setIsMessageSigned(false); 
    setIsLoading(false)
    setTokenDataObjects([])
    setHasQueried(false)
  }

  return {
    resetData,
    connectToMetamask,
    disconnectMetamask,
    setUserAddress,
    setIsMessageSigned,
    setHasQueried,
    setTokenDataObjects,
    setIsLoading,
    setError,
};
}
