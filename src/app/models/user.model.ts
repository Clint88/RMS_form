export interface User {
  uid?: string;
  displayName: string;
  email: string;
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
