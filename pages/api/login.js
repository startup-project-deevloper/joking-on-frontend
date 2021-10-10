import { Magic } from "@magic-sdk/admin";
import axios from "axios";
import { getStrapiURL } from "../../lib/strapi";

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

import withSession from "../../utils/session";
import wrapper from "../../utils/wrapper";

const Login = withSession(wrapper(async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
  const user = await magic.users.getMetadataByToken(did);

  const verify = await axios({method:'post', url: getStrapiURL("users/verify/"), data: JSON.stringify({email: user.email}), headers:{"Content-Type": 'application/json', authorization: `Bearer ${process.env.NEXT_JWT}`}})
  if(verify.status === 200) {
    const token = req.headers.authorization.substring(7);
    res.cookie(
      "user",
      (await axios({
        method: "get",
        url: getStrapiURL("users/me"),
        headers: {
          "Accepts": "application/json",
          authorization: `Bearer ${token}`,
        },
      })).data,
      { maxAge: 604800 }
    );
    res.cookie("magic", token, { maxAge: 900 } )
  } else {
    res.status(422).end()
  }
  

  return res.json({
    user: {...user, id: verify.data.id},
    cookieArray: res.cookieArray,
  });
}));

export default Login;