import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthService } from '../../service/auth.service'
import { EnumResponseStatus } from 'src/app/shared/app-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInUser: User
  // email = "admin@gmail.com"
  // password = "password"
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signInUser = new User()
    this.signInUser.email = ''
    this.signInUser.password = ''
  }
  login() {
    this.authService.loginUser(this.signInUser.email, this.signInUser.password).subscribe(res => {
      if (res.status === EnumResponseStatus.Success) {
        localStorage.setItem('token', res.payload.token)
        localStorage.setItem('user', res.payload.user.name)
        localStorage.setItem('email', res.payload.user.email)
        alert("successfully log in")
        this.router.navigate(['content'])
      } else {
        alert("Invalid username and password. Please Try again")
      }
    }, err => {
      alert("Invalid username and password. Please Try again")
    })
  }
}
