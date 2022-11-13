export class User {
  constructor(
    public userName: string,
    public email: string,
    public emailVerified: boolean,
    public photoUrl: string,
    public userId?: string) {
  }

}