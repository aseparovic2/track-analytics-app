import gql from "graphql-tag";
export const ALL_USERS = gql`
  query {
    users ( query: {}) {
        _id,
        email,
        password,
        role
    }
}
`;
