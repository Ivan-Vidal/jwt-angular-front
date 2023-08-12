import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterService } from 'src/app/core/services/register.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  response: any = ''

  registerForm!: FormGroup
  constructor(private route: Router, private fb: FormBuilder, private sweetAlertS: SweetAlertService, private registerService: RegisterService) {

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


  async onSubmit (form: IUser) {
      this.registerService.registerUser(form).subscribe(
        (result: any) =>  { 
          this.response = result
          this.sweetAlertS.success('Cadastro Realizado com Sucesso!','Cadastrado!')
          setTimeout(() => {
            this.route.navigate(['/login'])
          }, 3000);
        }
        
      )
      console.log(this.response)
  }
}
