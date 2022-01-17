import gql from 'graphql-tag'

const GET_AUTHORS = gql`
query allAuthors {
    allAuthors {
        firstName
        lastName
    }
}`

export default GET_AUTHORS