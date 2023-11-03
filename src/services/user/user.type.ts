export enum UserStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export type User = {
  id: number;
  username: string;
  role: Role;
  status: UserStatus;
};

export type GetUserListResponse = { data: User[] };

export type CreateUserResponse = User;
export type CreateUserRequest = {
  username: string;
  password: string;
  role: Role;
};

export type UpdateUserResponse = User;
export type UpdateUserRequest = {
  id: number;
  body: {
    role: Role;
    status: UserStatus;
  };
};
