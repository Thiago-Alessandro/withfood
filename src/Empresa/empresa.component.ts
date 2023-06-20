import { Component, OnInit } from "@angular/core";

interface Cardapio{
    empresa: Empresa|string
    listaItens:Item[]
}
interface Pedido {
    itens: Item[];
    quantidade: number;
}
interface Item {
    nomeItem:string;
    precoItem:number;
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
    selector: "app-empresa",
    templateUrl: "./empresa.component.html",
    //styleUrls: ["./empresa.component.css"]
})

export class EmpresaComponent implements OnInit{
    logoLaranja:string;
    exibindoCardapio:boolean

    cardapiosLista:Cardapio[]
    pedidosLista:Pedido[]

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

    exibirCardapio(){
        this.exibindoCardapio = !this.exibindoCardapio;
    }
}