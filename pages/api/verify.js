import { Magic } from "@magic-sdk/admin";
import axios from "axios";

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

import wrapper from "../../utils/wrapper";

const Verify = wrapper(async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
  const user = await magic.users.getMetadataByToken(did);

  const response = await axios({method: 'post', url:getStrapiURL('users/verify'), data: {email: user.email}});
  
  return res.json({
    id: response.id
  });
});

export default Verify;