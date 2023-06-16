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
    ngOnInit(): void {
        this.logoBranca = './assets/imagens/logoBranca.png'
        this.logoLaranja =  './assets/imagens/logoLaranja.png'
        this.garfoFaca = "./assets/imagens/garfoFaca.svg"
    }
}