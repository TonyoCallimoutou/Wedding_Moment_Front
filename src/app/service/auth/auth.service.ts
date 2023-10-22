import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import * as auth from 'firebase/auth';
import {take} from 'rxjs';
import {UserModelService} from '../../viewModel/user-model.service';
import {EventModelService} from "../../viewModel/event-model.service";
import {StorageModelService} from "../../viewModel/storage-model.service";
import {CookieHelper} from "../../shared/service/cookie.helper";
import {LoaderService} from "../../shared/service/loader.service";
import {User} from "../../model/user.model";
import {LocalModel} from "../../model/local.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData!: User;

  constructor(
    public userModelService: UserModelService,
    public eventModelService: EventModelService,
    public storageModelService: StorageModelService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public loaderService: LoaderService,
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
  SignIn(email: string, password: string): Promise<boolean> {
    this.loaderService.setLoader(true,2000);
    return new Promise(resolve => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user) {
            let id = result.user.uid;
            result.user.getIdToken(true)
              .then((idToken: string) => {
                CookieHelper.set(LocalModel.TOKEN, idToken);
                this.userModelService.getUserFromDB(id)
                  .pipe(take(1))
                  .subscribe((user: User) => {
                    if (!user.emailVerified && result.user?.emailVerified) {
                      this.userModelService.setUserIsVerified(user.userId)
                        .pipe(take(1))
                        .subscribe(() => {
                          console.log("user : ", user.userId, ' is now verified')
                        })
                    }

                    this.loaderService.setLoader(false);
                    resolve(true);

                    user.emailVerified = user.emailVerified ? user.emailVerified : result.user?.emailVerified ? result.user.emailVerified : false;
                    CookieHelper.set(LocalModel.USER, JSON.stringify(user));
                    this.userModelService.initUserData();
                    this.eventModelService.initUserData();
                  });
              });
          }

        })
        .catch((error) => {
          this.loaderService.setLoader(false);
          resolve(false);
          console.log(error);
        });

    });

  }

  // Sign up with email/password
  SignUp(name: string, email: string, password: string): Promise<any> {
    this.loaderService.setLoader(true,2000);
    return new Promise(resolve => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user) {
            result.user.getIdToken(true)
              .then((idToken: string) => {
                CookieHelper.set(LocalModel.TOKEN, idToken);
                this.SendVerificationMail();

                this.loaderService.setLoader(false);
                resolve(true);
                this.createUser(result, name);
              });
          }
        })
        .catch((error) => {
          this.loaderService.setLoader(false);
          resolve(error);
        });
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
    this.loaderService.setLoader(true,2000);
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
                      this.loaderService.setLoader(false);
                      window.location.reload();
                    } else {
                      this.loaderService.setLoader(false);
                      this.createUser(result);
                    }
                  });
              }
            });
        }
      })
      .catch((error) => {
        this.loaderService.setLoader(false);
        window.alert(error);
      });
  }

  private createUser(result: any,  name : string = result.user.name) {
    if (!!result.user) {

      this.loaderService.setLoader(true,2000);
      this.userData = {
        userId : result.user.uid,
        userName: result.user.displayName,
        email:  result.user.email,
        emailVerified: result.user.emailVerified,
        photoUrl: result.user.photoURL ? result.user.photoURL : "https://firebasestorage.googleapis.com/v0/b/projet-secret-a86d6.appspot.com/o/users%2F0?alt=media&token=da247115-af2f-466d-b4e7-526d1860bec6",
        nbrOfPost: 0
      }

      this.userModelService.createUser(this.userData)
        .pipe(take(1))
        .subscribe((user: User) => {
          CookieHelper.set(LocalModel.USER, JSON.stringify(user));
          this.userModelService.initUserData();
          this.eventModelService.initUserData();
          this.loaderService.setLoader(false);

          window.location.reload();
        });
    }
  }

  passWithoutSignIn() {
    this.loaderService.setLoader(true,2000);
    this.userModelService.getUserFromDB("0")
      .pipe(take(1))
      .subscribe((user: User) => {
        CookieHelper.set(LocalModel.USER, JSON.stringify(user));
        this.userModelService.initUserData();
        this.eventModelService.initUserData();
        this.loaderService.setLoader(false);
        window.location.reload();
      });
  }

  // Sign out
  SignOut() {
    this.loaderService.setLoader(true,2000, "Déconnexion");
    return this.afAuth.signOut().then(() => {
      CookieHelper.set(LocalModel.TOKEN, '');
      this.loaderService.setLoader(false);
      this.passWithoutSignIn()
    });
  }

  // Remove user
  RemoveUser() {
    this.loaderService.setLoader(true,2000, "Suppression du compte");
    this.userModelService.removeUser()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.afAuth.signOut().then(() => {
          this.loaderService.setLoader(false);
          CookieHelper.set(LocalModel.TOKEN, '');
          this.passWithoutSignIn()
        })
      })
  }
}
