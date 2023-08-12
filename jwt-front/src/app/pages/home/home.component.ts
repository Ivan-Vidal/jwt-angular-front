import { Component } from '@angular/core';
import { Emitters } from 'src/app/core/emitters/emitters';
import { AuthService } from 'src/app/core/services/auth.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
message = ''
  constructor (private authService: AuthService, private sweetAlertS: SweetAlertService){

  }

  ngOnInit() {
    this.authService.authUser().subscribe(
      res => {
        console.log(res)
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
    this.authService.logout().subscribe(
      res => {
        this.sweetAlertS.error('Sua sessão expirou','OPS!')
        Emitters.authEmitters.emit(false)
      }
    )
  }



}
