import { createContext, useState, useEffect, useCallback } from "react";
import { Magic } from "magic-sdk";
import { AvalancheExtension } from "@magic-ext/avalanche";
import {ethers} from "ethers";
import { useRouter } from "next/router";
import parseCookies from "../utils/parseCookies";
import axios from "axios";
import { getStrapiURL } from "../lib/strapi";
import { useCookies } from "react-cookie";
import { getNextURL } from "../lib/next";
import { Provider } from "../node_modules/next-auth/client";
import { getAvaxRPCURL } from "../lib/polkadot";

export const WalletContext = createContext({})


export const WalletProvider = ({ children }) => {
  const [deferToMagic, setDeferToMagic] = useState(true);
  const [address, setAddress] = useState(0x0);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [nonce, setNonce] = useState("");
  const [cookie, setCookie] = useCookies("strapi")
  
  const getNonceThenUseNonceForStrapiLogin = useCallback(async () => {
    const result = await axios({method:"post", url: getNextURL('nonce'), data: {
        address: address
    }})

    setNonce(result.data.nonce);

    const token = await axios({
      method: "post",
      url: getStrapiURL("auth/local/loginWithSignedNonce"),
      data: {
        identifier: address,
        nonceSecret: await signer.signMessage(nonce),
      },
    });

    if(token.status === 200) {
        setCookie("strapi", token.data, {maxAge: 666666})
        setDeferToMagic(false);
    }
  }, []);

  const AVALANCHE_PARAMS = {
    chainId:
      process.env.NEXT_PUBLIC_AVALANCHE_MODE === "production"
        ? "0xA86A"
        : "0xA869",
    chainName: `Avalanche ${
      process.env.NEXT_PUBLIC_AVALANCHE_MODE === "production"
        ? "Mainnet"
        : "Testnet"
    } C-Chain`,
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: [getAvaxRPCURL()],
    blockExplorerUrls: [
      `${
        process.env.NEXT_PUBLIC_AVALANCHE_MODE === "production"
          ? "https://cchain.explorer.avax.network/"
          : "https://cchain.explorer.avax-test.network/"
      }`,
    ],
  };

  function addAvalancheNetwork() {
    getProvider().then((provider) => {
      provider
        .request({
          method: "wallet_addEthereumChain",
          params: [AVALANCHE_PARAMS],
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  const connectWallet = useCallback(async () => {
    await addAvalancheNetwork();
    setPrepSigner(true)
  })
  
  useEffect(() => {
    if(!provider) {
        setProvider(new Provider(
            { network: {
                chainId: 41
            }, opinions: { 
                pocket: process.env.NEXT_PUBLIC_POCKET_APP_ID,
            }
        }))
    } else if(!signer) {
        signer = "";
    }
  }, [provider, signer])
  return (
    <WalletContext.Provider
      value={{
        address: address,
        signer: signer,
        deferToMagic: deferToMagic,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
