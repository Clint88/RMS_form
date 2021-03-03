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
  signedin = true;

  constructor(public auth: AuthService) {}
  signIn = this.auth.googleSignin();
}
