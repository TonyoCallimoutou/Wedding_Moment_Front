export class Comment {
    constructor(
      public commentId: number,
      public pictureId: number,
      public comment: string,
      public countLikeComment: number,
      public userId: number,
      public userName: string,
      public photoUrl: string
      ) {
    }
  
  }