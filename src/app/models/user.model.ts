export interface User {
  displayName: string;
  email: string;
  uid: string;
  perfersDark?: boolean;
  isUser?: boolean;
  isAdmin?: boolean;
  isDeleted?: boolean;
}

export interface UserClaims {
  isUser: boolean;
  isAdmin: boolean;
  isDeleted: boolean;
  _lastCommitted: string;
}
