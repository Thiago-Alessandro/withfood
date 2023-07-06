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
    if(this.clienteLogado !=null && this.clienteLogado.cpf !=undefined){
        // console.log(this.clienteLogado.cpf !=undefined)
    console.log("mostrando o cardapio todo")
    console.log(nomeEmpresaCardapio)
    this.nomeDaEmpresa = nomeEmpresaCardapio;
    this.itensPedido.push(item)
    console.log(this.criptografar('testando'))
    console.log(this.descriptografar(this.criptografar('testando')))
    return
    }
    alert("faça login como um cliente para fazer pedidos")
    location.replace('http://localhost:4200/Login')
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

criptografar(stringACriptografar:string):string{
    let criptografando:string[]=[]
    criptografando = stringACriptografar.split('')
    stringACriptografar = ''
    for(let caractere of criptografando){
        if(caractere == 'a'){
            caractere = caractere.replace('a','b')

        }else if(caractere == 'b'){
            caractere = caractere.replace('b','c')

        }else if(caractere == 'c'){
            caractere = caractere.replace('c','d')

        }else if(caractere == 'd'){
            caractere = caractere.replace('d','e')

        }else if(caractere == 'e'){
            caractere = caractere.replace('e','f')

        }else if(caractere == 'f'){
            caractere = caractere.replace('f','g')

        }else if(caractere == 'g'){
            caractere = caractere.replace('g','h')

        }else if(caractere == 'h'){
            caractere = caractere.replace('h','i')

        }else if(caractere == 'i'){
            caractere = caractere.replace('i','j')

        }else if(caractere == 'j'){
            caractere = caractere.replace('j','k')

        }else if(caractere == 'k'){
            caractere = caractere.replace('k','l')

        }else if(caractere == 'l'){
            caractere = caractere.replace('l','m')

        }else if(caractere == 'm'){
            caractere = caractere.replace('m','n')

        }else if(caractere == 'n'){
            caractere = caractere.replace('n','o')

        }else if(caractere == 'o'){
            caractere = caractere.replace('o','p')

        }else if(caractere == 'p'){
            caractere = caractere.replace('p','q')

        }else if(caractere == 'q'){
            caractere = caractere.replace('q','r')

        }else if(caractere == 'r'){
            caractere = caractere.replace('r','s')

        }else if(caractere == 's'){
            caractere = caractere.replace('s','t')

        }else if(caractere == 't'){
            caractere = caractere.replace('t','u')

        }else if(caractere == 'u'){
            caractere = caractere.replace('u','v')

        }else if(caractere == 'v'){
            caractere = caractere.replace('v','w')

        }else if(caractere == 'w'){
            caractere = caractere.replace('w','x')

        }else if(caractere == 'x'){
            caractere = caractere.replace('x','y')

        }else if(caractere == 'y'){
            caractere = caractere.replace('y','z')

        }else if(caractere == 'z'){
            caractere = caractere.replace('z','a')

        }
        stringACriptografar+=caractere
    }
    // stringCriptografada = criptografando.join('')
        return stringACriptografar;
}

descriptografar(stringADescriptografar:string):string{
    let descriptografando:string[]=[]
    descriptografando = stringADescriptografar.split('')
    stringADescriptografar = ''
    for(let caractere of descriptografando){
        if(caractere == 'a'){
            caractere = caractere.replace('a','z')

        }else if(caractere == 'b'){
            caractere = caractere.replace('b','a')

        }else if(caractere == 'c'){
            caractere = caractere.replace('c','b')

        }else if(caractere == 'd'){
            caractere = caractere.replace('d','c')

        }else if(caractere == 'e'){
            caractere = caractere.replace('e','d')

        }else if(caractere == 'f'){
            caractere = caractere.replace('f','e')

        }else if(caractere == 'g'){
            caractere = caractere.replace('g','f')

        }else if(caractere == 'h'){
            caractere = caractere.replace('h','g')

        }else if(caractere == 'i'){
            caractere = caractere.replace('i','h')

        }else if(caractere == 'j'){
            caractere = caractere.replace('j','i')

        }else if(caractere == 'k'){
            caractere = caractere.replace('k','j')

        }else if(caractere == 'l'){
            caractere = caractere.replace('l','k')

        }else if(caractere == 'm'){
            caractere = caractere.replace('m','l')

        }else if(caractere == 'n'){
            caractere = caractere.replace('n','m')

        }else if(caractere == 'o'){
            caractere = caractere.replace('o','n')

        }else if(caractere == 'p'){
            caractere = caractere.replace('p','o')

        }else if(caractere == 'q'){
            caractere = caractere.replace('q','p')

        }else if(caractere == 'r'){
            caractere = caractere.replace('r','q')

        }else if(caractere == 's'){
            caractere = caractere.replace('s','r')

        }else if(caractere == 't'){
            caractere = caractere.replace('t','s')

        }else if(caractere == 'u'){
            caractere = caractere.replace('u','t')

        }else if(caractere == 'v'){
            caractere = caractere.replace('v','u')

        }else if(caractere == 'w'){
            caractere = caractere.replace('w','v')

        }else if(caractere == 'x'){
            caractere = caractere.replace('x','w')

        }else if(caractere == 'y'){
            caractere = caractere.replace('y','x')

        }else if(caractere == 'z'){
            caractere = caractere.replace('z','y')

        }
        stringADescriptografar+=caractere
    }
    // stringDescriptografada = descriptografando.join('')
        return stringADescriptografar;
}

}