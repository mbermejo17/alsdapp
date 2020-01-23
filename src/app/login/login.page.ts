import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { User } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
  credentials = {
    email: 'test@test.com',
    pw: '123456'
  };

  loginUser = new User(null, '', '', '');

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { }

  login() {
    this.loginUser.email = this.credentials.email;
    this.loginUser.password = this.credentials.pw;
    this.auth.login(this.loginUser).subscribe(
      async result => {
      if (result.ok && result.ok === true ) {
        console.log(result);
        this.router.navigateByUrl('/app');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Wrong credentials.',
          buttons: ['OK']
        });
        await alert.present();
      }
    },
   async error =>{
      if ( error.error && error.error.ok === false) {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Wrong credentials.',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        console.log('Error: ', error.error);
      }
    });
  }

}