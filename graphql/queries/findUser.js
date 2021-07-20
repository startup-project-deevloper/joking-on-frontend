import gql from "graphql-tag";

const FIND_USER_QUERY = gql`
query findUser ($where: JSON) {
    users (where: $where) {
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
        content
        type
      }
    	profilePhoto {
        url
      }
      nonfungibleTokens {
        address {
          content
        }
        image {
					url
        }
        name
      }
      links {
        content
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
        profilePhoto {
          url
        }
      }
      followers {
        username
        profilePhoto {
          url
        }
    }
  }
}`;

export default FIND_USER_QUERY;