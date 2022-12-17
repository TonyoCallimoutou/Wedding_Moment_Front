export class Post {
    constructor(
      public postId: number,
      public eventId: number,
      public categorieId: number,
      public pictureUrl: string,
      public countLike: number,
      public countComment: number,
      public userId: string,
      public userName: string,
      public photoUrl: string) {
    }
  
  }