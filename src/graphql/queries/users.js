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
        role,
    }
}
`

export const ADD_USER = gql`
mutation addUser ($data: UserInsertInput!){
    insertOneUser (data: $data ) {
        email,
        password,
        role
    }
}
`

export const UPDATE_USER = gql`
mutation updateUser ($data: UserUpdateInput!, $userId: ObjectId!){
    updateOneUser (
    query: {
        _id: $userId       
    },
    set: $data
    ) {
        password,
        email,
        role
    }
}
`

export const DELETE_USER = gql`
mutation deleteUser ($userId: ObjectId!){
    deleteOneUser (query: 
        {
          _id: $userId,
        }
    ) {
        _id,
        email,
        password,
        role
    }
}
`
