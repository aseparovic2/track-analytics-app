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
            _id
        }
    }
}
`;
