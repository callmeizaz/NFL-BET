export interface LoginPayload {
  emailOrUsername: string;
  password: string;
  state?: string;
}
