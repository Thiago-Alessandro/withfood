import { Component, OnInit } from "@angular/core";


@Component({
    selector:'app-login',
    templateUrl:'./login.component.html'
})

export class LoginComponent implements OnInit{
    logoLaranja: string;


    ngOnInit(): void {
        this.logoLaranja = "./assets/imagens/logoLaranja.png    "
    }
}