export interface ApiSignInData {
  login: string;
  password: string;
}

interface AuthState {
  s: string;
  n: string;
  p: string;
  exp: number;
  type: number;
}

export interface ApiSignInResponseData {
  token: string;
  expiresIn: number;
  tokenType: string;
  authState: AuthState;
}
