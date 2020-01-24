import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

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
    private alertCtrl: AlertController,
    private storage: Storage
  ) { }

  ngOnInit() { }

  login() {
    this.loginUser.email = this.credentials.email;
    this.loginUser.password = this.credentials.pw;
    this.auth.login(this.loginUser).subscribe(
      async res => {
      if (res.result && res.result === 'ok' ) {
        console.log(res.token);
        this.storage.set('token', res.token);
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
   async error => {
      if ( error.error && error.error.ok === false) {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Wrong credentials.',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        console.log('Error: ', error);
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Server error',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

}
