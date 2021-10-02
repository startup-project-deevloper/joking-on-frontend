import { Magic } from "@magic-sdk/admin";

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

import withSession from "../../utils/session";
import wrapper from "../../utils/wrapper";

const Login = withSession(wrapper(async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
  const user = await magic.users.getMetadataByToken(did);

  res.cookie("user", user, { maxAge: 604800 });

  res.end();
}));

export default Login;