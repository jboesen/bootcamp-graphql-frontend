import gql from 'graphql-tag'

const ADD_AUTHOR = gql`
mutation addAuthor($input: AddAuthorInput) {
    addAuthor (input: $input) {
        firstName
        lastName
    }
}`

export default ADD_AUTHOR