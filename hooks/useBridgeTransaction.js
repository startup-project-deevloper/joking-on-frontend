import { useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../contexts/auth";
import { Hyphen, RESPONSE_CODES } from "@biconomy/hyphen";
import { ethers } from "ethers";
import moment from "moment";

const useHyphen = (
  currentNetwork,
  contractAddress,
  onSuccessCallback,
  amount,
  destinationAddress,
  destinationNetwork,
  toChainId,
  fromChainId
) => {
  const { user, magic, arbitrumMagic } = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(
    `transaction-${destinationAddress}-${currentNetwork}-${user.username}`,
    (value = {
      retryTime: moment(new Date.getTime()).add(30, "m").toDate(),
      transaction: {},
      result: false,
    })
  );
  const [countDownToReprocess, setCountDownToReprocess] = useState(900);
  const [initRan, setInitRan] = useState(false);
  const [provider, setProvider] = useState(currentNetwork === "arbitrum" ? arbitrumMagic : magic);
  const [hyphen, setHyphen] = useState(null);

  useEffect(() => {
    if(user) {
    if (!initRan) {
      if (currentNetwork !== destinationNetwork) {
        setHyphen(
          new Hyphen(
            currentNetwork === "arbitrum"
              ? arbitrumMagic.rpcProvider
              : magic.rpcProvider,
            toChainId,
            fromChainId,
            {
              debug: true,
              environment: "test",
              biconomy: true, // It can be "test" or "prod"
              onFundsTransfered: (data) => {
                promulgateTransactionSuccess(data);
              },
              biconomy = false,
            }
          )
        );
      }
      setInitRan(true);
    } else if (initRan && !ethers) {
      await hyphen.yinit();
      setProvider(new ethers.providers.Web3Provider(biconomy));
    } else if (provider) {
      if (!tryAfter || tryAfter < new Date().getTime()) {
        processTransaction();
      }
    }
  }
    const processTransaction = async () => {
      let transaction;
      if (currentNetwork !== destinationNetwork) {
        let preTransferStatus = await hyphen.preDepositStatus({
          tokenAddress: contractAddress, // Token address on fromChain which needs to be transferred
          amount: amount, // Amount of tokens to be transferred in smallest unit eg wei
          fromChainId: fromChainId, // Chain id from where tokens needs to be transferred
          toChainId: toChainId, // Chain id where tokens are supposed to be sent
          userAddress: user.address,
          depositContract:
            currentNetwork === "ethereum"
              ? process.env.NEXT_PUBLIC_ETHEREUM_ARBITRUM_DEPOSIT_CONTRACT
              : process.env.NEXT_PUBLIC_ARBITRUM_ETHEREUM_DEPOSIT_CONTRACT,
        });

        if (preTransferStatus.code === RESPONSE_CODES.OK) {
          const domainType = [
            { name: "name", type: "string" },
            { name: "version", type: "string" },
            { name: "verifyingContract", type: "address" },
            { name: "chainId", type: "integer" },
          ];
          const metaTransactionType = [
            { name: "nonce", type: "uint256" },
            { name: "from", type: "address" },
            { name: "to", type: "address" },
          ];
          let domainData = {
            name: "LaughContract",
            version: "1",
            verifyingContract:
              currentNetwork === "arbitrum"
                ? process.env.NEXT_PUBLIC_ARBITRUM_LAUGH_CONTRACT_ADDRESS
                : process.env.NEXT_PUBLIC_ETHEREUM_LAUGH_CONTRACT_ADDRESS,
            chainId: fromChainId,
          };

          const contract = new ethers.Contract(
            contractAddress,
            currentNetwork === "arbitrum"
              ? process.env.NEXT_PUBLIC_ARBITRUM_LAUGH_CONTRACT_ABI
              : process.env.NEXT_PUBLIC_ETHEREUM_LAUGH_CONTRACT_ABI,
            signer.connectUnchecked()
          );

          const interface = new ethers.utils.Interface(
            currentNetwork === "arbitrum"
              ? process.env.NEXT_PUBLIC_ARBITRUM_LAUGH_CONTRACT_ABI
              : process.env.NEXT_PUBLIC_ETHEREUM_LAUGH_CONTRACT_ABI
          );
          const approval = interface.approve(
            preTransferStatus.depositContract,
            amount.toString()
          );
          approval.wait(1);
          const signer = ethers.getSigner();

          let nonce = await contract.getNonce(user.username);

          let functionSignature = contractInterface.encodeFunctionData(
            "transferTo",
            [
              user.username,
              preTransferStatus.depositContract,
              amount.toString(),
            ]
          );
          let message = {};
          message.nonce = parseInt(nonce);
          message.from = user.username;
          message.to = preTransferStatus.depositContract;
          message.functionSignature = functionSignature;

          const dataToSign = JSON.stringify({
            types: {
              EIP712Domain: domainType,
              MetaTransaction: metaTransactionType,
            },
            domain: domainData,
            primaryType: "MetaTransaction",
            message: message,
          });

          let signature = await provider.send("eth_signTypedData_v4", [
            user.username,
            dataToSign,
          ]);
          let { r, s, v } = getSignatureParameters(signature);
          transaction = contract.executeMetaTransaction(
            user.username,
            functionSignature,
            r,
            s,
            v
          );

          preTransactionPending = false;
        } else if (
          preTransferStatus.code === RESPONSE_CODES.ALLOWANCE_NOT_GIVEN
        ) {
          if (
            contractAddress ===
              process.env.NEXT_PUBLIC_ARBITRUM_LAUGH_CONTRACT_ADDRESS ||
            contractAddress ===
              process.env.NEXT_PUBLIC_ETHEREUM_LAUGH_CONTRACT_ADDRESS
          ) {
            const domainType = [
              { name: "name", type: "string" },
              { name: "version", type: "string" },
              { name: "verifyingContract", type: "address" },
              { name: "chainId", type: "integer" },
            ];
            const metaTransactionType = [
              { name: "nonce", type: "uint256" },
              { name: "from", type: "address" },
              { name: "to", type: "address" },
            ];
            let domainData = {
              name: "LaughContract",
              version: "1",
              verifyingContract:
                currentNetwork === "arbitrum"
                  ? process.env.NEXT_PUBLIC_ARBITRUM_LAUGH_CONTRACT_ADDRESS
                  : process.env.NEXT_PUBLIC_ETHEREUM_LAUGH_CONTRACT_ADDRESS,
              chainId: fromChainId,
            };

            const contract = new ethers.Contract(
              contractAddress,
              currentNetwork === "arbitrum"
                ? process.env.NEXT_PUBLIC_ARBITRUM_LAUGH_CONTRACT_ABI
                : process.env.NEXT_PUBLIC_ETHEREUM_LAUGH_CONTRACT_ABI,
              signer.connectUnchecked()
            );

            const interface = new ethers.utils.Interface(
              currentNetwork === "arbitrum"
                ? process.env.NEXT_PUBLIC_ARBITRUM_LAUGH_CONTRACT_ABI
                : process.env.NEXT_PUBLIC_ETHEREUM_LAUGH_CONTRACT_ABI
            );
            const approval = interface.approve(
              preTransferStatus.depositContract,
              amount.toString()
            );
            approval.wait(1);
            const signer = ethers.getSigner();

            let nonce = await contract.getNonce(user.username);

            let functionSignature = contractInterface.encodeFunctionData(
              "transferTo",
              [
                user.username,
                preTransferStatus.depositContract,
                amount.toString(),
              ]
            );
            let message = {};
            message.nonce = parseInt(nonce);
            message.from = user.username;
            message.to = preTransferStatus.depositContract;
            message.functionSignature = functionSignature;

            const dataToSign = JSON.stringify({
              types: {
                EIP712Domain: domainType,
                MetaTransaction: metaTransactionType,
              },
              domain: domainData,
              primaryType: "MetaTransaction",
              message: message,
            });

            let signature = await provider.send("eth_signTypedData_v4", [
              user.username,
              dataToSign,
            ]);
            let { r, s, v } = getSignatureParameters(signature);
            transaction = contract.executeMetaTransaction(
              user.username,
              functionSignature,
              r,
              s,
              v
            );

            preTransactionPending = false;
          } else if (preTransferStatus.code === RESPONSE_CODES.NO_LIQUIDITY) {
            console.log("No Liquidity");
            console.log(preTransferStatus.code);
          } else {
            console.log(preTransferStatus.code);
          }
        }
      }
      
      return transaction;
    };
  }, [
    countDownToReprocess,
    magic,
    arbitrumMagic,
    currentNetwork,
    contractAddress,
    amount,
    destinationAddress,
    destinationNetwork,
    provider,
    coverGas,
    tryAfter,
  ]);

  const promulgateTransactionSuccess = useCallback(async () => {
    setCookie(
      `transaction-${destinationAddress}-${currentNetwork}-${user.username}`,
      {
        result: true,
        ...cookies.load(
          `transaction-${destinationAddress}-${currentNetwork}-${user.username}`
        ).value,
      }
    );
    onSuccessCallback(data);
  });

  const verifyCompletion = useCallback(async () => {
    return cookies.load(
      `transaction-${destinationAddress}-${currentNetwork}-${user.username}`
    ).value?.result;
  }, []);

  return { verifyCompletion };
};

export default useHyphen;
