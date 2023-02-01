export class Post {
    constructor(
      public postId: number,
      public eventId: number,
      public pictureUrl: string,
      public countReact: number,
      public userId: string,
      public userName: string,
      public photoUrl: string) {
    }

  }
