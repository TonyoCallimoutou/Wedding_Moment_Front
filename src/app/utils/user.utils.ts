// @ts-ignore
import {User} from "../model/user.model";

// Creer User depuis FirebaseUser
export class UserUtils {
  static createUserFromFirebase(data: any) {
    return new User(
      data.displayName,
      data.email,
      data.emailVerified,
      data.photoURL,
      data.uid
    );
  }
}
