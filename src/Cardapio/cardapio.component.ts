import { Component, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";

interface Cardapio {
    nomeEmpresa: string;
    itensCardapio:string[];
    categoria: string;
}
interface Cliente{
    nome:string,
    email:string,
    telefone:string,
    cpf:string,
    senha:string,
    endereco:string
}
interface Pedido {
    itens: Item[];
    endereco: string;
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


ngOnInit(): void {
    const logado = localStorage.getItem('logado');
    this.clienteLogado = JSON.parse(logado);
    const cardapios = localStorage.getItem('cardapios');
    this.cardapiosLista = JSON.parse(cardapios);

}

pedido: Pedido = {
    itens: null,
    endereco: ''
  }
item: Item = {
    nomeItem: '',
    precoItem: 0  
  }

mostraPedido(){
    this.aberto = true
}
escondePedido(){
    this.aberto = false
}

adicionaItens(item:Item){
    // const item: Item = {
    //     nomeItem:this.item.nomeItem,
    //     precoItem:this.item.precoItem
    // }
    console.log(item)
    this.itensPedido.push(item)
//     if (this.cliques>=1){
//         this.cliques+=1;
//     } else {
//     this.cliques=0;
//     this.cliques+=1;
// }
}
removeItens(item: Item){
this.itensPedido.splice(this.itensPedido.indexOf(item),1);
// localStorage.removeItem("Itens");
//     localStorage.setItem("Itens", JSON.stringify(this.itensPedido));
}

cadastraPedido(){
    const pedido: Pedido = {
        itens: this.itensPedido,
        endereco: this.clienteLogado.endereco
      }
      this.pedidosLista.push(this.pedido);
      localStorage.setItem("pedidos", JSON.stringify(this.pedidosLista));
      this.itensPedido = null;
}
}