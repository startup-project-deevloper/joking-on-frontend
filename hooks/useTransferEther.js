import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

const useTransferEther = (to, amount) => {
  const { library } = useWeb3React();

  // Hook Function
  const transferEther = useCallback(
    async (to, amount) => {
      const signer = library.getSigner();
      signer.sendTransaction({
        to: to,
        value: ethers.utils.parseEther(amount),
      });
      console.log("Sending: ", amount, ", to: ", to);
    },
    [to, amount, library]
  );

  return transferEther;
};

export default useTransferEther;
