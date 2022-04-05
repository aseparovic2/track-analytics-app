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

export const AUTH_USER = gql`
query authUser ($email: String!, $password: String!){
    user ( query: {
        email: $email,
        password: $password
    }) {
        _id,
        email,
        password,
        role
    }
}

`
