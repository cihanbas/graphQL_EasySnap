import {gql} from 'apollo-boost';

export const CREATE_USER = gql`
  mutation($username: String!, $password: String!) {
    createUser(data: {username: $username, password: $password}) {
      token
    }
  }
`;
export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signIn(data: {username: $username, password: $password}) {
      token
    }
  }
`;
export const CreateSnap = gql`
  mutation($user_Id: String!, $text: String!) {
    createSnap(data: {user_Id: $user_Id, text: $text}) {
      text
      createAt
      id
      user {
        username
        id
      }
    }
  }
`;
export const DELETE_SNAP = gql`
  mutation($id: String!) {
    deleteSnap(data: {id: $id}) {
      id
    }
  }
`;
export const GET_ACTIVE_USER = gql`
  query {
    activeUser {
      username
      id
    }
  }
`;
export const GET_SNAPS = gql`
  query {
    snaps {
      text
      createAt
      id
      user {
        username
      }
    }
  }
`;
