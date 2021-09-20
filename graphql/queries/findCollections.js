import gql from "graphql-tag";

const FIND_COLLECTIONS = gql`
  query findCollections($where: JSON) {
    users(where: $where) {
      id
      username
      email
      firstName
      lastName
      avatar
      role
      createdAt
      updatedAt
      isActive
    }
  }
`;

export default FIND_COLLECTIONS;