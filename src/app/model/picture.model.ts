export class Picture {
    constructor(
      public pictureId: number,
      public pictureUrl: string,
      public countLike: number,
      public countComment: number,
      public userId: number,
      public userName: string,
      public photoUrl: string) {
    }
  
  }