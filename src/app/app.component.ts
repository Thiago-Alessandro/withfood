import { Component, OnInit } from '@angular/core';
interface Cliente{
  nome:string,
  email:string,
  telefone:string,
  cpf:string,
  senha:string,
  endereco:string
}

interface Empresa{
  nome:string,
  email:string,
  telefone:string,
  cnpj:string,
  senha:string,
  numeroContaBancaria:string,
  agencia:string,
  nomeDoResponsavel:string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'withfood';
  logoLaranja:string;
    logoPequena:string;
    email:string;
    logado:Empresa|Cliente = null;
    abreLogout: boolean = false;

  ngOnInit(): void {
      this.logoLaranja = "./assets/imagens/logoLaranja.png"
      this.logoPequena = './assets/imagens/logoPequena.svg'
      this.email = "./assets/imagens/email.svg"
      let login = localStorage.getItem('logado');
      this.logado = JSON.parse(login);
  }
sair(){
  localStorage.removeItem('logado')
this.logado= null;
this.abreLogout = false;
window.location.replace('http://localhost:4200/Home')
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
