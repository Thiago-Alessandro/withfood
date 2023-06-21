import { Component, OnInit } from "@angular/core";

@Component({
    selector:"app-home",
    templateUrl:"./home.component.html",
    styleUrls:['./home.component.css']
})

export class HomeComponent implements OnInit{

    
    logoBranca:string;
    logoLaranja:string;
    garfoFaca: string;
    logoPequena: string
    email: string
    booleanEmpresa: boolean;

    ngOnInit(): void {
        this.logoPequena = './assets/imagens/logoPequena.svg'
        this.logoBranca = './assets/imagens/logoBranca.png'
        this.logoLaranja =  './assets/imagens/logoLaranja.png'
        this.garfoFaca = "./assets/imagens/garfoFaca.svg"
        this.email = "./assets/imagens/email.svg"
    }


    redirecionarParaLogin(){
        window.location.replace('http://localhost:4200/Login')
    }
    redirecionarParaCadastro(numero:number){
        if(numero==1){
            this.booleanEmpresa = true;
        localStorage.setItem('booleanAba', JSON.stringify(this.booleanEmpresa));
        window.location.replace('http://localhost:4200/Cadastro')
    } else {
        window.location.replace('http://localhost:4200/Cadastro')
    }
    }
    redirecionarParaCardapio(){
        window.location.replace('http://localhost:4200/Cardapio')
    }
    redirecionarParaEmpresa(){
        window.location.replace('http://localhost:4200/Empresa')
    }
}