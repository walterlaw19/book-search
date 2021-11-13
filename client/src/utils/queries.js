import gql from 'graphql-tag';

export const QUERY_ME = gql`
query Query {
    me {
      _id
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
      email
      bookCount
    }
  }
`;

