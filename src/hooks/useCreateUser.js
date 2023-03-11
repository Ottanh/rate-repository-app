import { useMutation, gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;


const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    return mutate({ variables: { user: { username, password } } });
  };

  return [createUser, result];
};

export default useCreateUser;