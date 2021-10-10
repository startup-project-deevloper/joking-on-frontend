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

  const verify = await axios({method:'post', url: getStrapiURL("users/verify"), data: JSON.stringify({email: user.email}), headers:{"Content-Type": 'application/json'}})
  if(verify.status === 200) {
    const token = req.headers.authorization.substring(7);
    const cycleToken = await axios({
      method: "post",
      url: getStrapiURL("users/verify"),
      data: JSON.stringify({
        token: token,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if(cycleToken.status === 200) {
      res.cookie("user", verify.data, { maxAge: 604800 });
      res.cookie("magic", token, { maxAge: 900 } )
    }
  } else {
    const verify = await axios({
      method: "post",
      url: getStrapiURL("users/verify"),
      data: JSON.stringify({ email: user.email }),
      headers: { "Content-Type": "application/json" },
    });
  }
  

  return res.json({
    user: user,
    cookieArray: res.cookieArray,
  });
}));

export default Login;