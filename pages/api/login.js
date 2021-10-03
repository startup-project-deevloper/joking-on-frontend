import { Magic } from "@magic-sdk/admin";
import axios from "axios";

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

import withSession from "../../utils/session";
import wrapper from "../../utils/wrapper";

const Login = withSession(wrapper(async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();


  const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
  const user = await magic.users.getMetadataByToken(did);
  const sessionId = Math.random()*1000000;
  const response = await axios({method: "PUT", url: `${process.env.NEXT_PUBLIC_MODE=== "production" ? 'https://strapi.jokingon.com/users/setNextSession': 'http://localhost:1337/users/setNextSession'}`, data:{ id:req.body.id, sessionId: sessionId}, headers: {}});

  console.log(response.status);

  res.cookie("user", user, { maxAge: 604800 });
  res.cookie("session", { id: sessionId }, { maxAge: 604800 });

  return res.json({
    user: user,
    cookieArray: res.cookieArray,
  });
}));

export default Login;