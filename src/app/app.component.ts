import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/models/Cliente';
import { Empresa } from 'src/models/Empresa';
import { CriptografiaService } from 'src/services/criptografia.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'withfood';
  logoLaranja: string;
  logoPequena: string;
  email: string;
  logado: Empresa | Cliente = null;
  abreLogout: boolean = false;

  constructor(
    private criptografarService: CriptografiaService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.logoLaranja = this.localStorageService.getLogoLaranja()
    this.logoPequena = this.localStorageService.getLogoPequena()
    this.email = this.localStorageService.getImagemEmail()

    this.logado = this.localStorageService.getUsuarioLogado()
  }
  
  sair() {
    localStorage.removeItem('logado')
    this.logado = null;
    this.abreLogout = false;
    window.location.replace('http://localhost:4200/Home')
  }
  redirecionarParaLogin() {
    window.location.replace('http://localhost:4200/Login')
  }
  redirecionarParaHome() {
    window.location.replace('http://localhost:4200/Home')
  }
  redirecionarParaCardapio() {
    window.location.replace('http://localhost:4200/Cardapio')
  }
  redirecionarParaEmpresa() {
    window.location.replace('http://localhost:4200/Empresa')
  }
}
