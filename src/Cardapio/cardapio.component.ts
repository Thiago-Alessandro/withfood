import { Component, OnInit } from "@angular/core";
interface Cardapio {
    nomeEmpresa:string;
    itensCardapio:string[];
    categoria: string;
}
interface Pedido {
    itens: Item[];
    hora: Date;
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

export class CardapioComponent  {
    aberto:boolean = false;
cliques:number
pedidosLista: Pedido[];
itensPedido: Item[];


pedido: Pedido = {
    itens: null,
    hora: new Date()
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

adicionaItens(){
    const item: Item = {
        nomeItem:this.item.nomeItem,
        precoItem:this.item.precoItem
    }
    this.itensPedido.push(item)
    if (this.cliques>=1){
        this.cliques+=1;
    } else {
    this.cliques=0;
    this.cliques+=1;
}
}
removeItens(item: Item){
this.itensPedido.splice(this.itensPedido.indexOf(item),1)
localStorage.removeItem("Itens");
    localStorage.setItem("Itens", JSON.stringify(this.itensPedido));
}

cadastraPedido(){
    const pedido: Pedido = {
        itens: this.itensPedido,
        hora: new Date()
      }
      this.pedidosLista.push(this.pedido);
      localStorage.setItem("Pedidos", JSON.stringify(this.pedidosLista));
      this.itensPedido = null;
}



    redirecionarParaLogin(){
        window.location.replace('http://localhost:4200/Login')
    }
    redirecionarParaHome(){
        window.location.replace('http://localhost:4200/Home')
    }
    redirecionarParaCardapio(){
        window.location.replace('http://localhost:4200/Cardapio')
    }
    redirecionarParaEmpresa(){
        window.location.replace('http://localhost:4200/Empresa')
    }
}