import { Magic } from "@magic-sdk/admin";

import axios from "axios";

import { getStrapiURL } from "../../lib/strapi";

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

import withSession from "../../utils/session";
import wrapper from "../../utils/wrapper";

const Signup = withSession(wrapper(async (req, res) => {
    if (req.method !== "POST") return res.status(405).end();

    const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
    const user = await magic.users.getMetadataByToken(did);
    let verify;
    if(user?.email) {
      verify = await axios({
        method: "post",
        url: getStrapiURL("users"),
        data: JSON.stringify({ email: user.email, address: {name: `${req.body.username}_Magic_${user.publicAddress.substring(0,5)}...${user.publicAddress.substring(18)}`, publicKey: user.publicAddress }, ...req.body }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.NEXT_JWT}`,
        },
      });
    } else {
      verify = await axios({
        method: "post",
        url: getStrapiURL("users"),
        data: JSON.stringify({ phone: user.phoneNumber, address: {name: `${req.body.username}_Magic_${user.publicAddress.substring(0,5)}...${user.publicAddress.substring(18)}`, publicKey: user.publicAddress }, ...req.body }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.NEXT_JWT}`,
        },
      });
    }
    
    let u;
  
    if(verify.status === 200) {
      const token = req.headers.authorization.substring(7);
      u = (
        await axios({
          method: "get",
          url: getStrapiURL("users/me"),
          headers: {
            Accepts: "application/json",
            authorization: `Bearer ${token}`,
          },
        })
      );

      if(u.status === 200) {
        res.cookie(
          "user",
          { user: u.data },
          { maxAge: 604800 }
        );

        res.cookie("magic", {token: token}, { maxAge: 1000 } )
      } else {
        res.json({
          status: "error",
          message: u.error,
        });

        res.status(422).end();
      }
    } else {
      res.json({
        status: "error",
        message: verify.error,
      });

      res.status(422).end()
    }

    return res.json({
      user: {id: verify.data.id, ...u.data, ...user},
      cookieArray: res.cookieArray,
    });
  })
);

export default Signup;
