import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-empresa",
    templateUrl: "./empresa.component.html",
    //styleUrls: ["./empresa.component.css"]
})

export class EmpresaComponent implements OnInit{
    logoLaranja:string;
    opa: string[];
    aberto: Boolean;
    saiTeia(){
        if (this.aberto=true){
        this.aberto = false;
    }
    }
    mudaTela(){
        this.aberto = true;
    }
    ngOnInit(): void {
        this.logoLaranja = "./assets/imagens/logoLaranja.png"
    }



    redirecionarParaLogin(){
        window.location.replace('http://localhost:4200/Login')
    }
    redirecionarParaCardapio(){
        window.location.replace('http://localhost:4200/Cardapio')
    }
    redirecionarParaEmpresa(){
        window.location.replace('http://localhost:4200/Empresa')
    }
}