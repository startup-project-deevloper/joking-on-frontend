import withSession from "../../lib/session";
import client from "../../lib/apollo";

import findUser from "../../graphql/queries/findUser";

import { getUserFromServerCookie } from "../../lib/auth";

export default withUser(async (req, res) => {
  const { username } = await req.body;
  const { jwt } = getUserFromServerCookie(req);

  try {
    let user = await client.query({
      query: findUser,
      variables: { where: { username: username } },
    });
    user = {
      isLoggedIn: true,
      ...user,
    };
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
