import { Component, OnInit } from "@angular/core";
import { CriptografiaService } from "src/services/criptografia.service";

interface Cardapio {
    nomeEmpresa: string;
    itensCardapio:Item[];
    categoria: string;
    mediaAvaliacao:number;
    listaAvaliacao: number[];
}

interface Pedido {
    itens: Item[];
    endereco: string;
    nomeCliente: string;
    //nomeEmpresa: string;
    status:string;
    precoTotal:number;
    horaAtual:Date;
}
interface Item {
    nomeItem:string;
    precoItem:number;
    nomeEmpresa:string
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
    pedidosConcluidos: Pedido[] = [];
    // statusPedido = '';

    // itemMudanca: Item =  {
    //     nomeItem: '',
    //     precoItem:null
    // }
    nomeItemAMudar: string;
    precoItemAMudar: number;

    constructor(
        private criptografiaService: CriptografiaService
    ){}

    ngOnInit(): void {
        let pedidosConc = JSON.parse(this.criptografiaService.descriptografar(localStorage.getItem('pedidosConcluidos')))
        if(pedidosConc){
            
            this.pedidosConcluidos = pedidosConc
        }
        
        this.logoLaranja = "./assets/imagens/logoLaranja.png"
        //console.log(this.recuperarCardapio())
        let cardapios:Cardapio[]=[]
        console.log(localStorage.getItem('cardapios'))
        cardapios = JSON.parse(this.criptografiaService.descriptografar(localStorage.getItem('cardapios')))
        if (cardapios) {
            this.cardapiosLista = cardapios
        }
        if (JSON.parse(this.criptografiaService.descriptografar(localStorage.getItem('logado')))) {
            this.empresaLogada = JSON.parse(this.criptografiaService.descriptografar(localStorage.getItem('logado')))

            this.cardapioEmpresa = {
                nomeEmpresa: this.empresaLogada.nome,
                itensCardapio: [],
                categoria: "",
                mediaAvaliacao: null,
                listaAvaliacao: []
                // CUIDADO COM O NULL
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
        let pedidos:Pedido[] = JSON.parse(this.criptografiaService.descriptografar(localStorage.getItem('pedidos')))
        if (pedidos) {//verifica se n ta nulo
            console.log("entrei no if")
            for (let pedido of pedidos) {//passa por cada um
                console.log("entrei no for pedido")
               // console.log(pedido.nomeEmpresa)
               let pedidoDessaEmpressa:Pedido={
                   itens: [],
                   endereco: pedido.endereco,
                   nomeCliente: pedido.nomeCliente,
                   status: pedido.status,
                   precoTotal: 0,
                   horaAtual: pedido.horaAtual
               }
               for(let item of pedido.itens){
                    let valorTotalPedido:number = 0
                   if (item.nomeEmpresa == this.empresaLogada.nome) {//verifica se o item no pedido é dessa empresa logada msm
                       console.log("entrei no if do item da empresa")
                       console.log(pedido)
                       valorTotalPedido+=item.precoItem
                       pedidoDessaEmpressa.itens.push(item)
                   }
               }
               this.pedidosLista.push(pedidoDessaEmpressa)  //adiciona na lista
            }
        }

        // this.logado = JSON.parse(localStorage.getItem('logado'))

        // this.logado.cardapio = this.recuperarCardapio()

        // this.itensCardapio = this.logado.cardapio.itensCardapio
    }

    
    alterarStatus(pedidoMuda:Pedido){
        // this.pedidosLista.splice(this.pedidosLista.indexOf(pedidoMuda),1)
        // this.pedidosLista.push(pedidoMuda)
        if (pedidoMuda.status=='Concluido'){
            if (this.pedidosConcluidos.length==3){
                this.pedidosConcluidos.splice(0,1)
            }
            this.pedidosConcluidos.push(pedidoMuda)
            localStorage.setItem("pedidosConcluidos",this.criptografiaService.criptografar(JSON.stringify(this.pedidosConcluidos)))
     this.pedidosLista.splice(this.pedidosLista.indexOf(pedidoMuda),1)
        }
        localStorage.setItem('pedidos', this.criptografiaService.criptografar(JSON.stringify(this.pedidosLista)))
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
            precoItem: this.precoItemAMudar,
            nomeEmpresa: this.empresaLogada.nome
        }
        if (itemMudanca.nomeItem != '' && itemMudanca.precoItem != null) {
            console.log("entrei no if ")
            // console.log("item da mudança aqui")
            // console.log(itemMudanca)
            // console.log("Mostrando itens do cardapio")
            // console.log(this.cardapioEmpresa.itensCardapio)
            this.cardapioEmpresa.itensCardapio.splice(this.indiceMudancaAtributo, 1);
            this.cardapioEmpresa.itensCardapio.push(itemMudanca);
            // console.log("Mostrando itens do cardapio depois de colocar de novo")
            // console.log(this.cardapioEmpresa.itensCardapio)
            // console.log("Mostrando lista de cardapios antes de tirar")
            // console.log(this.cardapiosLista)
            this.cardapiosLista.splice(this.cardapiosLista.indexOf(this.cardapioEmpresa), 1)
            this.cardapiosLista.push(this.cardapioEmpresa)
            // console.log("Mostrando lista de cardapios depois de tirar e colocar de novo")
            // console.log(this.cardapiosLista)
            localStorage.removeItem('cardapios')
            // p remover n precisa (des)criptografar né?
            localStorage.setItem('cardapios', this.criptografiaService.criptografar(JSON.stringify(this.cardapiosLista)))
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
        
    }
    adicionarNovoItemAoCardapio() {

        let novoItem: Item = {
            nomeItem: this.novoItemNome,
            precoItem: this.novoItemPreco,
            nomeEmpresa: this.empresaLogada.nome
        }

        console.log(this.cardapioEmpresa)

        this.cardapioEmpresa.itensCardapio.push(novoItem)

        let empresaComCardapioRegistrado:boolean = false
        if(this.cardapiosLista.length == 0){
            this.cardapiosLista.push(this.cardapioEmpresa)
            empresaComCardapioRegistrado = true
        } else {
            for(let cardapio of this.cardapiosLista){
                if(cardapio.nomeEmpresa === this.empresaLogada.nome){
                    empresaComCardapioRegistrado = true
                }
            }
        }
        if(!empresaComCardapioRegistrado){
            this.cardapiosLista.push(this.cardapioEmpresa)
            console.log('foi eee')
        }
        
        console.log("this.cardapiosLista")
        console.log(this.cardapiosLista)
        localStorage.setItem('cardapios', this.criptografiaService.criptografar(JSON.stringify(this.cardapiosLista)))

        this.novoItemNome = ""
        this.novoItemPreco = null

    }
    removerAtributos(indice:number){
        this.cardapioEmpresa.itensCardapio.splice(indice,1)
        this.cardapiosLista.splice(this.cardapiosLista.indexOf(this.cardapioEmpresa), 1)
        this.cardapiosLista.push(this.cardapioEmpresa)
        localStorage.removeItem('cardapios')
        localStorage.setItem('cardapios', this.criptografiaService.criptografar(JSON.stringify(this.cardapiosLista)))
    }

}