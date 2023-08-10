import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup
  constructor(private route: Router, private fb: FormBuilder, private authService: AuthService) {

  }

  ngOnInit() {
    this.createForm()
    console.log(this.registerForm)
    console.log(this.registerForm.controls)
  }

  createForm(): void {
    this.registerForm = this.fb.group({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', {validators: [Validators.required]}),
    });
}

formValid() {
  if(this.registerForm.validator) {
    return true
  } else {
    return false
  }
} 


  async onSubmit () {
    try {
      const result = await this.authService.login(this.registerForm);
      console.log(`Login efetuado: ${result}`);

      this.route.navigate(['']);
    } catch (error) {
      console.log(error)
    }
  }
}
