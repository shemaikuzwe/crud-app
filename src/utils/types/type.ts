export interface Session {
  id: string;
  name: string;
  email: string;
  iat: string;
  exp: string;
}
export type LoginUser = {
  email: string;
  password: string;
};
