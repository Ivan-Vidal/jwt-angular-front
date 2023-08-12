import { Component } from '@angular/core';
import { Emitters } from 'src/app/core/emitters/emitters';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
message = ''
  constructor (private authService: AuthService){

  }

  ngOnInit() {
    this.authService.authUser().subscribe(
      res => {
       this.message  = `Olá ${res.name} seja bem-vindo!`
       Emitters.authEmitters.emit(true)
      },
      error => {
        this.message = 'Usuário nao autenticado'
       Emitters.authEmitters.emit(false)

      }
    )
  }


  logout() {
    
  }



}
