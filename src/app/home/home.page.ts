// Core+
import { Component } from '@angular/core';

// Services
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  signedin = false;
  user$;

  constructor(public auth: AuthService) {
    this.user$ = auth.user$;
  }
  signIn() {
    this.auth.googleSignin();
  }
  signOut() {
    this.auth.signOut();
  }
}
