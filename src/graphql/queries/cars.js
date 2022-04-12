import gql from "graphql-tag";
export const ALL_CARS = gql`
  query {
    cars (query: {}, limit: 3000) {
        _id
        battery
        body
        color
        licence
        model
        power
        range
        torque
        transmission
        user_id {
            _id,
            email
        }
    }
}
`;

export const CAR_BY_USER = gql`
  query getCarByUser ($userId: String!) {
    cars (query: {
            user_id: {
                _id: $userId
                }
        }, limit: 3000) {
        _id
        battery
        body
        color
        licence
        model
        power
        range
        torque
        transmission
        user_id {
            _id
        }
    }
}
`;

export const ADD_CAR = gql`
mutation createCar ($carData: CarInsertInput!){
    insertOneCar (data: $carData) {
        battery
        body
        color
        licence
        model
        power
        range
        torque
        transmission
        user_id {
            _id
            email
            password
            role
        }
    }
}
`

export const DELETE_CAR = gql`
mutation deleteCar ($carId: ObjectId!){
    deleteOneCar (query: {
        _id : $carId
    }) {
        _id
        battery
        body
        color
        licence
        model
        power
        range
        torque
        transmission
        user_id {
            _id
            email
            password
            role
        }
    }
}
`

export const UPDATE_CAR = gql`
mutation updateCar ($carData: CarUpdateInput!, $carId: ObjectId!) {
    updateOneCar (
        set: $carData, 
        query: {
            _id: $carId
        }
    ) {
        _id
        battery
        body
        color
        licence
        model
        power
        range
        torque
        transmission
        user_id {
            _id
            email
            password
            role
        }
    }
}

`
