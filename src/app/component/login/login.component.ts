import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInUser: User
  email = "admin@gmail.com"
  password = "password"
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
    this.authService.loginUser(this.email, this.password).subscribe(res => {
      localStorage.setItem('token', res.payload.token)
      localStorage.setItem('user', res.payload.user.name)
      localStorage.setItem('email', res.payload.user.email)
      alert("successfully log in")
      this.router.navigate(['home'])
    }, err => {
      console.error('loginUser error', err)
      console.log(err)
    })
  }
}
