import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { LoginService } from 'src/app/core/services/login.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup
  response: {} = {}

  constructor(private route: Router, private fb: FormBuilder, private loginService: LoginService, private sweetAlertS: SweetAlertService) {

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

 async onSubmit (form: IUser) {

    this.loginService.login(form).subscribe(
    result => {
      this.route.navigate(['/home'])
      console.log(result)
    },
    error => {
      this.sweetAlertS.error('Verifique os dados digitados','OPS!')

      console.log(error.message)
    }

    )
  }

}
