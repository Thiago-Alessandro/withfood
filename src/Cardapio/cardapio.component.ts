import { Component, OnInit } from "@angular/core";
interface Cardapio {
    nomeEmpresa:string;
    itemsCardapio:string[];
}
@Component({
    selector: "app-cardapio",
    templateUrl: "./cardapio.component.html",
    //styleUrls: ["./cardapio.component.css"]
})

export class CardapioComponent implements OnInit {
logoLaranja:string;
tridentes :string [];
tridente: string
cliques:number



add(){
    if (this.cliques>=1){
        this.cliques+=1;
    } else {
    this.cliques=0;
    this.cliques+=1;
}
}

ngOnInit(): void {
    this.logoLaranja = "./assets/imagens/logoLaranja.png"
    this.tridente = 'Hamburguer blend bovino 250g'
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