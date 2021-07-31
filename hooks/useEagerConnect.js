import { useEffect, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Networks } from "../../utils";

export const injectedConnector = React.memo(
  new InjectedConnector({
    supportedChainIds: [
      Networks.MainNet,
      Networks.Ropsten,
      Networks.Rinkeby,
      Networks.Goerli,
      Networks.Kovan,
      Networks.Localhost,
    ],
  })
);

const injected = injectedConnector;

const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);
  useEffect(() => {
    const run = false;

    function connect() {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    }

    if (!run) {
      connect();
    }

    return () => {
      run = true;
    };
  }, [injected, activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);
  return tried;
};

export default useEagerConnect;
