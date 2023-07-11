import { Component, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";
import { concat } from "rxjs";
import { CriptografiaService } from "src/services/criptografia.service";

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
usuarioLogadoCliente:boolean=false
empresasLista:Empresa[]=[]


pesquisar(){
this.modoPesquisa = true
}

constructor(
    private criptografiaService:CriptografiaService
){}

ngOnInit(): void {
    const empresas = JSON.parse(this.criptografiaService.descriptografar(localStorage.getItem('empresas')))
    if(empresas){
        this.empresasLista = empresas;
    }
    const logado = JSON.parse(this.criptografiaService.descriptografar(localStorage.getItem('logado')));
    if(logado){
        this.clienteLogado = logado;
        if(logado.cpf){
            this.usuarioLogadoCliente = true
        }
    }
    const cardapios = JSON.parse(this.criptografiaService.descriptografar(localStorage.getItem('cardapios')));
    if(cardapios){
        this.cardapiosLista = cardapios;
    }

}

// avaliar(cardapioAv : Cardapio){
//     cardapioAv.listaAvaliacao.push(cardapioAv.avaliacao)
// }




pedido: Pedido = {
    itens: null,
    endereco: '',
    nomeCliente: '',
   // nomeEmpresa: '',
    status: 'Em espera',
    precoTotal:0,
    horaAtual: new Date()
  }
item: Item = {
    nomeItem: '',
    precoItem: 0,
    nomeEmpresa: ''
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

        localStorage.setItem('cardapios', this.criptografiaService.criptografar(JSON.stringify(this.cardapiosLista)))

    }
  }

mostraPedido(){
    this.aberto = true
}
escondePedido(){
    this.aberto = false
}

adicionaItens(item:Item, nomeEmpresaCardapio: string){
    if(this.clienteLogado !=null && this.clienteLogado.cpf !=undefined){
        // console.log(this.clienteLogado.cpf !=undefined)
    console.log("mostrando o cardapio todo")
    console.log(nomeEmpresaCardapio)
    this.nomeDaEmpresa = nomeEmpresaCardapio;
    this.itensPedido.push(item)
    // console.log(this.criptografiaService.criptografar('testando'))
    // console.log(this.criptografiaService.descriptografar(this.criptografiaService.criptografar('testando')))
    return
    }
    alert("faça login como um cliente para fazer pedidos")
    // location.replace('http://localhost:4200/Login')
}
removeItens(item: Item){
this.itensPedido.splice(this.itensPedido.indexOf(item),1);
// localStorage.removeItem("Itens");
//     localStorage.setItem("Itens", JSON.stringify(this.itensPedido));
}

cadastraPedido(){
    for(let empresa of this.empresasLista){

        let itensDessaEmpresa:Item[]=[]

          for(let item of this.itensPedido){
            if(item.nomeEmpresa === empresa.nome){
                itensDessaEmpresa.push(item)
            }
          }
          const pedidoDaEmpresa: Pedido = {
            itens: itensDessaEmpresa,
            endereco: this.clienteLogado.endereco,
            nomeCliente: this.clienteLogado.nome,
            // nomeEmpresa: this.nomeDaEmpresa,
            status: 'A fazer',
            precoTotal: this.calculaPreco(itensDessaEmpresa),
            horaAtual: new Date()
          }
          this.pedidosLista.push(pedidoDaEmpresa);
    }
      localStorage.setItem("pedidos", this.criptografiaService.criptografar(JSON.stringify(this.pedidosLista)));
      this.itensPedido = [];
      this.preco=0;
}
calculaPreco(itensPedidoLista:Item[]) : number{
    this.preco=0;
    if(this.itensPedido){
    for(let i = 0; i <itensPedidoLista.length;i++){
        console.log(itensPedidoLista[i].precoItem)
        this.preco += itensPedidoLista[i].precoItem;
    }
}
    return this.preco;
}

}