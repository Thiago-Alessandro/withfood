import { Component, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";
import { concat } from "rxjs";

interface Cardapio {
    nomeEmpresa: string;
    itensCardapio:Item[];
    categoria: string;
    mediaAvaliacao:number;
    listaAvaliacao: Avaliacao[];
}
interface Avaliacao{
    valor:number,
    avaliador:Cliente
}
interface Cliente{
    nome:string,
    email:string,
    telefone:string,
    cpf:string,
    senha:string,
    endereco:string,
    historico: Pedido[];
}
interface Pedido {
    itens: Item[];
    endereco: string;
    nomeCliente: string;
    nomeEmpresa: string;
    status:string;
    precoTotal:number;
    horaAtual:Date;
}
interface Item {
    nomeItem:string;
    precoItem:number;
}
@Component({
    selector: "app-cardapio",
    templateUrl: "./cardapio.component.html",
    //styleUrls: ["./cardapio.component.css"]
})

export class CardapioComponent implements OnInit  {
    aberto:boolean = false;
cliques:number
pedidosLista: Pedido[] = [];
itensPedido: Item[] = [];
clienteLogado: Cliente
cardapiosLista:Cardapio[];
nomeDaEmpresa: string;
preco:number = 0;
pesquisa: string;
modoPesquisa: boolean  = false;
categoriaFiltro: string = 'Tudo'

pesquisar(){
this.modoPesquisa = true
}


ngOnInit(): void {
    const logado = localStorage.getItem('logado');
    this.clienteLogado = JSON.parse(logado);
    const cardapios = localStorage.getItem('cardapios');
    this.cardapiosLista = JSON.parse(cardapios);

}

// avaliar(cardapioAv : Cardapio){
//     cardapioAv.listaAvaliacao.push(cardapioAv.avaliacao)
// }




pedido: Pedido = {
    itens: null,
    endereco: '',
    nomeCliente: '',
    nomeEmpresa: '',
    status: 'Em espera',
    precoTotal:0,
    horaAtual: new Date()
  }
item: Item = {
    nomeItem: '',
    precoItem: 0  
  }

  novaAvaliacaoValor:string = '';

  avaliar(cardapio:Cardapio){
    if(this.novaAvaliacaoValor){
        let novaAvaliacao:Avaliacao = {
            valor: (JSON.parse(this.novaAvaliacaoValor)),
            avaliador:this.clienteLogado
        }
        let totalAvaliacao:number = 0;
        let jaAvaliou:boolean = false

        for(let avaliacao of cardapio.listaAvaliacao){
           if(avaliacao.avaliador === this.clienteLogado && !jaAvaliou){
                avaliacao.valor = novaAvaliacao.valor
                jaAvaliou = true
           }
           totalAvaliacao += avaliacao.valor
        }
        if(!jaAvaliou){
            cardapio.listaAvaliacao.push(novaAvaliacao)
            totalAvaliacao+=novaAvaliacao.valor
        }
        cardapio.mediaAvaliacao = totalAvaliacao/cardapio.listaAvaliacao.length
        this.novaAvaliacaoValor = ''

        localStorage.setItem('cardapios', JSON.stringify(this.cardapiosLista))

    }
  }

mostraPedido(){
    this.aberto = true
}
escondePedido(){
    this.aberto = false
}

adicionaItens(item:Item, nomeEmpresaCardapio: string){
    console.log("mostrando o cardapio todo")
    console.log(nomeEmpresaCardapio)
    this.nomeDaEmpresa = nomeEmpresaCardapio;
    this.itensPedido.push(item)
   
}
removeItens(item: Item){
this.itensPedido.splice(this.itensPedido.indexOf(item),1);
// localStorage.removeItem("Itens");
//     localStorage.setItem("Itens", JSON.stringify(this.itensPedido));
}

cadastraPedido(){
    const pedido: Pedido = {
        itens: this.itensPedido,
        endereco: this.clienteLogado.endereco,
        nomeCliente: this.clienteLogado.nome,
        nomeEmpresa: this.nomeDaEmpresa,
        status: 'A fazer',
        precoTotal: this.calculaPreco(),
        horaAtual: new Date()
      }
      this.pedidosLista.push(pedido);
      localStorage.setItem("pedidos", JSON.stringify(this.pedidosLista));
      this.itensPedido = [];
      this.preco=0;
}
calculaPreco() : number{
    this.preco=0;
if(this.itensPedido){
    for(let i = 0; i <this.itensPedido.length;i++){
        console.log(this.itensPedido[i].precoItem)
        this.preco += this.itensPedido[i].precoItem;
    }
}
    return this.preco;
}
}