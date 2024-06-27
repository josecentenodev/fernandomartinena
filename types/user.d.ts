export type CreateUserParams = {
  clerkId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  userType: 'admin' | 'customer';
};

export type UpdateUserParams = {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  userType?: 'admin' | 'customer';
};
