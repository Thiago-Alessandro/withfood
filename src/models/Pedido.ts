import { Item } from "./Item";

export class Pedido {
    itens: Item[] = [];
    endereco: string = "";
    nomeCliente: string = "";
    status:string = "Em espera";
    precoTotal:number = 0;
    horaAtual:Date = new Date();
}