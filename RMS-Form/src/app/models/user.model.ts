export interface User {
  displayName: string;
  perfersDark: boolean;
  email: string;
  uid: string;
}

export interface UserClaims {
  isUser: boolean;
  isAdmin: boolean;
  isDeleted: boolean;
  _lastCommitted: string;
}
