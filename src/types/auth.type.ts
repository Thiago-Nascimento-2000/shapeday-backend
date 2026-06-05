export type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ChangePasswordData = {
  userId: string;
  currentPassword: string;
  newPassword: string;
};

export type ChangeEmailData = {
  userId: string;
  password: string;
  newEmail: string;
};
