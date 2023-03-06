import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public auth: AngularFireAuth) {}

  // Registrieren
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Anmelden
  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Abmelden
  signOut() {
    return this.auth.signOut();
  }

  // Zurücksetzen des Passworts
  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }

  // Google-Authentifizierung
  googleAuth() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
