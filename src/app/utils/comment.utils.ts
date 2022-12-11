import { Comment } from "../model/comment.model"


// Creer User depuis FirebaseUser
export class CommentUtils {
    static SetComment(refComment: Comment, newData: any) {
        refComment.pictureId = newData.pictureId
        refComment.comment = newData.comment
        refComment.countLikeComment = newData.countLikeComment
        refComment.userId = newData.userId
        refComment.userName = newData.userName
        refComment.photoUrl = newData.photoUrl
        
    }

    static SetUser(comment: Comment, user : any) {
        comment.userId = user.userId;
        comment.userName = user.userName;
        comment.photoUrl = user.photoUrl;
    }
}