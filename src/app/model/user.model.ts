export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public userId?: number,
    public password?: string,
    public picture?: string) {
  }

}