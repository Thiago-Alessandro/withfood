import { Pedido } from "./Pedido";

export class Cliente {
    nome:string = "";
    email:string = "";
    telefone:string = "";
    cpf:string = "";
    senha:string = "";
    endereco:string = "";
    historico: Pedido[] = [];
}