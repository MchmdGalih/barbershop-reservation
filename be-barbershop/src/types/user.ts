interface UserInput {
  username: string;
  email: string;
  password: string;
  roleId: string;
}

interface UserUpdateInput {
  username?: string;
  email?: string;
  roleId?: string;
}

export { UserInput, UserUpdateInput };
