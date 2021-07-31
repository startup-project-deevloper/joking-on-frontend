import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

const useInjectedEthers = () => {
  // State
  const [provider, setProvider] = useState("");
  const [signer, setSigner] = useState("");
  const [address, setAddress] = useState("");
  // const [balance, setBalance] = useState('');
  // Hook Function
  const fetchEthers = useCallback(async () => {
    let ethereum = window.ethereum;
    // await ethereum.enable()
    await ethereum.eth_requestAccounts;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const address = provider.provider.selectedAddress;

    console.log(await provider.provider.selectedAddress);
    console.log(provider);
    console.log(address);

    setProvider(provider);
    setSigner(signer);
    setAddress(address);

    // if (address) {
    //   const balance = ethers.utils.formatEther(
    //     await provider.getBalance(address)
    //   );
    //   setBalance(balance);
    // }
  }, []);

  // Hook
  useEffect(() => {
    fetchEthers();
  }, [fetchEthers]);

  return [provider, signer, address, fetchEthers];
};

export default useInjectedEthers;
