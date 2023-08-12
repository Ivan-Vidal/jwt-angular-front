import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup
  response: {} = {}

  constructor(private route: Router, private fb: FormBuilder, private loginService: LoginService) {

  }

  ngOnInit() {
    this.createForm()
    console.log(this.loginForm)
    console.log(this.loginForm.controls)
  }

   createForm(): void {
    this.loginForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', {validators: [Validators.required]}),
    });
}


formValid() {
  if(this.loginForm.validator) {
    return true
  } else {
    return false
  }
} 

controlForm() {
  if (this.loginForm.controls) {
    
  }
}

 async onSubmit (form: IUser) {

    this.loginService.login(form).subscribe(
    result => {
      this.route.navigate(['/home'])
      console.log(result)
    },
    error => {
      console.log(error.message)
    }

    )
    
    console.log(this.response)
  }

}
