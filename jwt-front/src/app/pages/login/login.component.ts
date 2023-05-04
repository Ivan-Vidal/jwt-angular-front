import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(private route: Router, private fb: FormBuilder, private authService: AuthService) {

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

 async onSubmit () {
    try {
      const result = await this.authService.login(this.loginForm);
      console.log(`Login efetuado: ${result}`);

      this.route.navigate(['']);
    } catch (error) {
      console.log(error)
    }
  }

}
