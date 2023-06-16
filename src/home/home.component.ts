import { Component, OnInit } from "@angular/core";

@Component({
    selector:"app-home",
    templateUrl:"./home.component.html"
})

export class HomeComponent implements OnInit{
    logoBranca:string;
    logoLaranja:string;
    ngOnInit(): void {
        this.logoBranca = './assets/imagens/logoBranca.png'
        this.logoLaranja =  './assets/imagens/logoLaranja.png'
    }
}