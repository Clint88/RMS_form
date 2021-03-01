// Core+
import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

// Services
// import { AuthService } from 'src/app/services/auth.service';

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
    this.user$.subscribe((user) => {
      console.log(user);
    });
  }
  signIn() {
    this.auth.googleSignin();
  }
}
