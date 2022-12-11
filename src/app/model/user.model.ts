export class User {
  constructor(
    public userId: string,
    public userName: string,
    public email: string,
    public emailVerified: boolean,
    public photoUrl: string) {
  }

}