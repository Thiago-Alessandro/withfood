import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'withfood';
  logoLaranja:string;



  ngOnInit(): void {
      this.logoLaranja = "./assets/imagens/logoLaranja.png"
  }

  redirecionarParaLogin(){
    window.location.replace('http://localhost:4200/Login')
}
redirecionarParaHome(){
    window.location.replace('http://localhost:4200/Home')
}
redirecionarParaCardapio(){
    window.location.replace('http://localhost:4200/Cardapio')
}
redirecionarParaEmpresa(){
    window.location.replace('http://localhost:4200/Empresa')
}
}
