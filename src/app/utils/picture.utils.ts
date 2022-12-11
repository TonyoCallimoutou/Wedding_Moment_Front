import { Picture } from "../model/picture.model";

// Creer User depuis FirebaseUser
export class PictureUtils {
    static SetPicture(refPicture: Picture, newData: any) {
        refPicture.pictureUrl = newData.pictureUrl
        refPicture.countLike = newData.countLike
        refPicture.countComment = newData.countComment
        refPicture.userId = newData.userId
        refPicture.userName = newData.userName
        refPicture.photoUrl = newData.photoUrl
    }

    static SetUser(picture: Picture, user : any) {
        picture.userId = user.userId;
        picture.userName = user.userName;
        picture.photoUrl = user.photoUrl;
    }
}