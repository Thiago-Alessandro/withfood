import { Component, OnInit } from "@angular/core";

interface Cardapio{
    nomeEmpresa:string
    itensCardapio:Item[]
    categoria:string
}

interface Pedido {
    itens: Item[];
    endereco:string
    nomeEmpresa:string
    //ta faltando a data ai
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
    //cardapio    :Cardapio
}

@Component({
    selector: "app-empresa",
    templateUrl: "./empresa.component.html",
    //styleUrls: ["./empresa.component.css"]
})


export class EmpresaComponent implements OnInit{
    logoLaranja:string;

    empresaLogada:Empresa

    exibindoCardapio:boolean

    cardapiosLista:Cardapio[] = [];
    //itensCardapio:Item[] = [];
    pedidosLista:Pedido[] = [];
    cardapioEmpresa:Cardapio

    novoItemNome:string
    novoItemPreco:number

    ngOnInit(): void {
        this.logoLaranja = "./assets/imagens/logoLaranja.png"
        //console.log(this.recuperarCardapio())
        let cardapios = JSON.parse(localStorage.getItem('cardapios'))
        if(cardapios){
            this.cardapiosLista = cardapios
        }
        if(JSON.parse(localStorage.getItem('logado'))){
            this.empresaLogada = JSON.parse(localStorage.getItem('logado'))

            this.cardapioEmpresa = {
                nomeEmpresa: this.empresaLogada.nome,
                itensCardapio:[],
                categoria:""
            }

            
            console.log(this.cardapioEmpresa)
            if(this.recuperarCardapio()){
                this.cardapioEmpresa = this.recuperarCardapio()
            }
            // if(this.empresaLogada.cardapio){
            // this.itensCardapio = this.empresaLogada.cardapio.itensCardapio
            // }
        }
        
        this.pedidosLista = null // setar p n duplicar qnd roda dnv
        let pedidos = JSON.parse(localStorage.getItem('pedidos'))
        if(pedidos){//verifica se n ta nulo
            for(let pedido of pedidos){//passa por cada um
                if(pedido.nomeEmpresa == this.empresaLogada.nome){//verifica se o pedido é dessa empresa logada msm
                    this.pedidosLista.push(pedido)  //adiciona na lista
                }
            }
        }

        // this.logado = JSON.parse(localStorage.getItem('logado'))

        // this.logado.cardapio = this.recuperarCardapio()
        
        // this.itensCardapio = this.logado.cardapio.itensCardapio
    }
    recuperarCardapio():Cardapio{
        for(let cardapio of this.cardapiosLista){
            if(cardapio.nomeEmpresa == this.empresaLogada.nome){
                return cardapio
            }
        }
        return null
    }

    alterarExibicaoCardapio(){
        this.exibindoCardapio = !this.exibindoCardapio
    }

    adicionarNovoItemAoCardapio(){
        //console.log(this.novoItemPreco)
        let novoItem:Item = {
            nomeItem: this.novoItemNome,
            precoItem: this.novoItemPreco
        }

        console.log(this.cardapioEmpresa)

        this.cardapioEmpresa.itensCardapio.push(novoItem)
        // if(this.cardapioEmpresa.itensCardapio){
        //     this.empresaLogada.cardapio.itensCardapio = this.itensCardapio
        // }
        this.cardapiosLista.push(this.cardapioEmpresa)

        localStorage.setItem('cardapios',JSON.stringify(this.cardapiosLista))
    }

}