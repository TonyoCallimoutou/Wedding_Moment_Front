export class Picture {
    constructor(
      public userId: number,
      public pictureUrl: string,
      public countLike: number,
      public countComment: number,
      public pictureId?: number) {
    }
  
  }