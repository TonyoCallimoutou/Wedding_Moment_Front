import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import * as auth from 'firebase/auth';
import {take} from 'rxjs';
import {UserModelService} from '../../viewModel/user-model.service';
import {LocalModel} from "../../model/local.model";
import {EventModelService} from "../../viewModel/event-model.service";
// @ts-ignore
import {User} from '../../model/user.model';
import {StorageModelService} from "../../viewModel/storage-model.service";
import {CookieService} from "ngx-cookie-service";
import {CookieHelper} from "../cookie.helper";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData: User;

  constructor(
    public userModelService: UserModelService,
    public eventModelService: EventModelService,
    public storageModelService: StorageModelService,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    /* Saving user data in Cookies when
    logged in and setting up null when logged out */
    this.afAuth.authState
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          this.userModelService.initUserData();
          this.eventModelService.initUserData();
        }

      });
  }

  // Returns true when user is connected
  get isLoggedIn(): boolean {
    const user = CookieHelper.get(LocalModel.USER);
    return user !== null;
  }

  // Returns true when user is connected but email isn't verified
  get isVerified(): boolean {
    const user = CookieHelper.get(LocalModel.USER);
    return user !== null && JSON.parse(user).emailVerified;
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          this.userModelService.getUserFromDB(result.user.uid)
            .pipe(take(1))
            .subscribe((user: User) => {
              if (!user.emailVerified && result.user?.emailVerified) {
                this.userModelService.setUserIsVerified(user.userId)
                  .pipe(take(1))
                  .subscribe(() => {
                    console.log("ok")
                  })
              }
              user.emailVerified = user.emailVerified ? user.emailVerified : result.user?.emailVerified
              CookieHelper.set(LocalModel.USER, JSON.stringify(user));
              this.userModelService.initUserData();
              this.eventModelService.initUserData();
            });
        }

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(name: string, email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          result.user.getIdToken(true)
            .then((idToken: string) => {
              CookieHelper.set(LocalModel.TOKEN, idToken);
              this.SendVerificationMail();

              this.createUser(result, name);
            });
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        window.alert('Email send');
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user) {
          result.user.getIdToken(true)
            .then((idToken: string) => {
              CookieHelper.set(LocalModel.TOKEN, idToken);
              if (result.user) {
                this.userModelService.getUserFromDB(result.user.uid)
                  .pipe(take(1))
                  .subscribe((user: User) => {
                    if (user != null) {
                      CookieHelper.set(LocalModel.USER, JSON.stringify(user));
                      this.userModelService.initUserData();
                      this.eventModelService.initUserData();
                      window.location.reload();
                    } else {
                      this.createUser(result);
                    }
                  });
              }
            });
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  private createUser(result: any,  name : string = result.user.name) {
    if (!!result.user) {
      this.userData = {
        userId : result.user.uid,
        userName: result.user.displayName,
        email:  result.user.email,
        emailVerified: result.user.emailVerified,
        photoUrl: "https://firebasestorage.googleapis.com/v0/b/projet-secret-a86d6.appspot.com/o/users%2F0?alt=media&token=da247115-af2f-466d-b4e7-526d1860bec6",
        nbrOfPost: 0
      }
      // If user have picture
      if (result.user.photoUrl) {
        this.storageModelService.uploadUserPictureAndGetUrl(result.user.uid, result.user.photoUrl)
          .then(url => {
            this.userData.photoUrl = url;
            this.userModelService.createUser(this.userData)
              .pipe(take(1))
              .subscribe((user: User) => {
                CookieHelper.set(LocalModel.USER, JSON.stringify(user));
                this.userModelService.initUserData();
                this.eventModelService.initUserData();

                window.location.reload();
              });
          })
      }
      // If User do not have picture
      else {
        this.userModelService.createUser(this.userData)
          .pipe(take(1))
          .subscribe((user: User) => {
            CookieHelper.set(LocalModel.USER, JSON.stringify(user));
            this.userModelService.initUserData();
            this.eventModelService.initUserData();

            window.location.reload();
          });
      }
    }
  }

  passWithoutSignIn() {
    this.userModelService.getUserFromDB("0")
      .pipe(take(1))
      .subscribe((user: User) => {
        CookieHelper.set(LocalModel.USER, JSON.stringify(user));
        this.userModelService.initUserData();
        this.eventModelService.initUserData();
        window.location.reload();
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      CookieHelper.set(LocalModel.TOKEN, '');
      this.passWithoutSignIn()
    });
  }

  // Remove user
  RemoveUser() {
    this.userModelService.removeUser()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.afAuth.signOut().then(() => {
          CookieHelper.set(LocalModel.TOKEN, '');
          this.passWithoutSignIn()
        })
      })
  }
}
