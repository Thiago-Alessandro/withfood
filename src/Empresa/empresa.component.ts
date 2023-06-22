import { Component, OnInit } from "@angular/core";

interface Cardapio {
    nomeEmpresa: string
    itensCardapio: Item[]
    categoria: string
}

interface Pedido {
    itens: Item[];
    endereco: string
    nomeCliente: string
    nomeEmpresa: string
    status: string
    precoTotal: number
    horaAtual: Date;

    //ta faltando a data ai
}


interface Item {
    nomeItem: string;
    precoItem: number;
}
interface Empresa {
    nome: string,
    email: string,
    telefone: string,
    cnpj: string,
    senha: string,
    numeroContaBancaria: string,
    agencia: string,
    nomeDoResponsavel: string
    //cardapio    :Cardapio
}

@Component({
    selector: "app-empresa",
    templateUrl: "./empresa.component.html",
    //styleUrls: ["./empresa.component.css"]
})


export class EmpresaComponent implements OnInit {
    logoLaranja: string;
    editar: boolean;
    itemEditando: Item;
    empresaLogada: Empresa
    preenchido: boolean = true;

    exibindoCardapio: boolean = true;

    cardapiosLista: Cardapio[] = [];
    //itensCardapio:Item[] = [];
    pedidosLista: Pedido[] = [];
    cardapioEmpresa: Cardapio

    novoItemNome: string
    novoItemPreco: number
    indiceMudancaAtributo: number;

    // itemMudanca: Item =  {
    //     nomeItem: '',
    //     precoItem:null
    // }
    nomeItemAMudar: string;
    precoItemAMudar: number;
    ngOnInit(): void {
        this.logoLaranja = "./assets/imagens/logoLaranja.png"
        //console.log(this.recuperarCardapio())
        let cardapios = JSON.parse(localStorage.getItem('cardapios'))
        if (cardapios) {
            this.cardapiosLista = cardapios
        }
        if (JSON.parse(localStorage.getItem('logado'))) {
            this.empresaLogada = JSON.parse(localStorage.getItem('logado'))

            this.cardapioEmpresa = {
                nomeEmpresa: this.empresaLogada.nome,
                itensCardapio: [],
                categoria: ""
            }


            console.log(this.cardapioEmpresa)
            if (this.recuperarCardapio()) {
                this.cardapioEmpresa = this.recuperarCardapio()
            }
            // if(this.empresaLogada.cardapio){
            // this.itensCardapio = this.empresaLogada.cardapio.itensCardapio
            // }
        }

        this.pedidosLista = []; // setar p n duplicar qnd roda dnv
        let pedidos = JSON.parse(localStorage.getItem('pedidos'))
        if (pedidos) {//verifica se n ta nulo
            console.log("entrei no if")
            for (let pedido of pedidos) {//passa por cada um
                console.log("entrei no for")
                console.log(pedido.nomeEmpresa)
                if (pedido.nomeEmpresa == this.empresaLogada.nome) {//verifica se o pedido é dessa empresa logada msm
                    console.log("entrei no if da empresa")
                    console.log(pedido)
                    this.pedidosLista.push(pedido)  //adiciona na lista
                }
            }
        }

        // this.logado = JSON.parse(localStorage.getItem('logado'))

        // this.logado.cardapio = this.recuperarCardapio()

        // this.itensCardapio = this.logado.cardapio.itensCardapio
    }
    recuperarCardapio(): Cardapio {
        for (let cardapio of this.cardapiosLista) {
            if (cardapio.nomeEmpresa == this.empresaLogada.nome) {
                return cardapio
            }
        }
        return null
    }
verificarEmpresa(){
}
    atualizarAtributos() {
        let itemMudanca: Item = {
            nomeItem: this.nomeItemAMudar,
            precoItem: this.precoItemAMudar
        }
        if (itemMudanca.nomeItem != '' && itemMudanca.precoItem != null) {
            console.log("entrei no if ")
            console.log("item da mudança aqui")
            console.log(itemMudanca)
            console.log("Mostrando itens do cardapio")
            console.log(this.cardapioEmpresa.itensCardapio)
            this.cardapioEmpresa.itensCardapio.splice(this.indiceMudancaAtributo, 1);
            this.cardapioEmpresa.itensCardapio.push(itemMudanca);
            console.log("Mostrando itens do cardapio depois de colocar de novo")
            console.log(this.cardapioEmpresa.itensCardapio)
            console.log("Mostrando lista de cardapios antes de tirar")
            console.log(this.cardapiosLista)
            this.cardapiosLista.splice(this.cardapiosLista.indexOf(this.cardapioEmpresa), 1)
            this.cardapiosLista.push(this.cardapioEmpresa)
            console.log("Mostrando lista de cardapios depois de tirar e colocar de novo")
            console.log(this.cardapiosLista)
            localStorage.removeItem('cardapios')
            localStorage.setItem('cardapios', JSON.stringify(this.cardapiosLista))
            this.editar = false;
            this.indiceMudancaAtributo = null;
            this.itemEditando = null;
            this.preenchido = true;
            this.nomeItemAMudar = '';
            this.precoItemAMudar = null;

        } else {
            console.log("entrei no else")
            this.preenchido = false;
            this.editar = true;
        }

    }
    mostraCardapio() {
        this.exibindoCardapio = true;
    }
    mostraPedido() {
        this.exibindoCardapio = false;
    }
    editarAtributos(indice: number) {
        let itemDoFor = this.cardapioEmpresa.itensCardapio[indice];
        console.log("itemDoFor")
        console.log(itemDoFor)
        this.indiceMudancaAtributo = indice;
        this.editar = true;
        this.itemEditando = itemDoFor;
        this.nomeItemAMudar = itemDoFor.nomeItem;
        this.precoItemAMudar = itemDoFor.precoItem;
        console.log("itemMudança")
        // console.log(this.itemMudanca)
    }
    adicionarNovoItemAoCardapio() {
        //console.log(this.novoItemPreco)
        let novoItem: Item = {
            nomeItem: this.novoItemNome,
            precoItem: this.novoItemPreco
        }

        console.log(this.cardapioEmpresa)

        this.cardapioEmpresa.itensCardapio.push(novoItem)
        // if(this.cardapioEmpresa.itensCardapio){
        //     this.empresaLogada.cardapio.itensCardapio = this.itensCardapio
        // }
        this.cardapiosLista.splice(this.cardapiosLista.indexOf(this.cardapioEmpresa), 1)
        this.cardapiosLista.push(this.cardapioEmpresa)
        localStorage.removeItem('cardapios')
        localStorage.setItem('cardapios', JSON.stringify(this.cardapiosLista))
    }
    removerAtributos(indice:number){
        this.cardapioEmpresa.itensCardapio.splice(indice,1)
        this.cardapiosLista.splice(this.cardapiosLista.indexOf(this.cardapioEmpresa), 1)
        this.cardapiosLista.push(this.cardapioEmpresa)
        localStorage.removeItem('cardapios')
        localStorage.setItem('cardapios', JSON.stringify(this.cardapiosLista))
    }
}