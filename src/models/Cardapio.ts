import { Avaliacao } from "./Avaliacao";
import { Item } from "./Item";

export class Cardapio {
    nomeEmpresa: string = "";
    itensCardapio:Item[] = [];
    categoria: string = "";
    mediaAvaliacao:number = 0;
    listaAvaliacao: Avaliacao[] = [];
}