import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from '../services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthorizeService]
})
export class LoginComponent implements OnInit {

  name: string = '';
  password: string = '';
  message: string = '';

  constructor(private auth: AuthorizeService, private router: Router) {

  }

  ngOnInit(): void {
  }

  login() {
    this.auth.getAuthToken(this.name, this.password)
      .subscribe((res) => {
        if (res.valid) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", this.name);
          this.router.navigate(['ep']);
        } else {
          this.message = 'Invalida username/password';
        }
      });
  }

}
