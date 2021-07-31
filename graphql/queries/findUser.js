import gql from "graphql-tag";

const FIND_USER_QUERY = gql`
  query findUser($where: JSON) {
    users(where: $where) {
      username
      firstName
      lastName
      confirmed
      blocked
      bio
      isComedian
      laughsLaughedAt
      addresses {
        name
        address
        type
      }
      profilePhoto
      nonfungibleTokens {
        address {
          address
        }
        visualization {
          url
        }
        name
      }
      links {
        link
        name
      }
      videos {
        content {
          url
        }
      }
      avatar {
        content
      }
      items {
        content
      }
      laughedAtVideos {
        id
      }
      laughedAtComments {
        id
      }
      following {
        id
        username
        profilePhoto
      }
      followers {
        username
        profilePhoto
      }
    }
  }
`;

export default FIND_USER_QUERY;
