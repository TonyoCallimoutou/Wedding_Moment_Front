import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import * as auth from 'firebase/auth';
import {take} from 'rxjs';
import {UserModelService} from '../viewModel/user-model.service';
import {LocalModel} from "../model/local.model";
import {EventModelService} from "../viewModel/event-model.service";
// @ts-ignore
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData: User;

  constructor(
    public userModelService: UserModelService,
    public eventModelService: EventModelService,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    /* Saving user data in localstorage when
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

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(LocalModel.USER)!);
    return user !== null && user.emailVerified;
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
              localStorage.setItem(LocalModel.USER, JSON.stringify(user));
              this.userModelService.initUserData();
              this.eventModelService.initUserData();

              this.router.navigate(['home-page']);
            });
        }

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.userModelService.createUser(result.user)
          .pipe(take(1))
          .subscribe((user: User) => {
            localStorage.setItem(LocalModel.USER, JSON.stringify(user));
            this.userModelService.initUserData();
            this.eventModelService.initUserData();
            window.location.reload();
          });
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
        this.router.navigate(['verify-email-address']);
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
          this.userModelService.getUserFromDB(result.user.uid)
            .pipe(take(1))
            .subscribe((user: User) => {
              if (user != null) {
                localStorage.setItem(LocalModel.USER, JSON.stringify(user));
                this.userModelService.initUserData();
                this.eventModelService.initUserData();
                this.router.navigate(['home-page']);
              } else {
                this.userModelService.createUser(result.user)
                  .pipe(take(1))
                  .subscribe((user: User) => {
                    localStorage.setItem(LocalModel.USER, JSON.stringify(user));
                    this.userModelService.initUserData();
                    this.eventModelService.initUserData();
                    this.router.navigate(['home-page']);
                  });
              }
            });
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  passWithoutSignIn() {
    this.userModelService.getUserFromDB("0")
      .pipe(take(1))
      .subscribe((user: User) => {
        localStorage.setItem(LocalModel.USER, JSON.stringify(user));
        this.userModelService.initUserData();
        this.eventModelService.initUserData();
        this.router.navigate(['home-page']);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem(LocalModel.USER)
      this.router.navigate(['sign-in']);
    });
  }

  // Remove user
  RemoveUser() {
    this.userModelService.removeUser()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.afAuth.signOut().then(() => {
          localStorage.removeItem(LocalModel.USER)
          this.router.navigate(['sign-in']);
        })
      })


    return this.afAuth.signOut().then(() => {
      this.userModelService.removeUser();
      localStorage.removeItem(LocalModel.USER)
      this.router.navigate(['sign-in']);
    });
  }
}
