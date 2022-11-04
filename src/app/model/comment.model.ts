export class Comment {
    constructor(
      public pictureId: number,
      public userId: number,
      public comment: string,
      public commentId?: number) {
    }
  
  }