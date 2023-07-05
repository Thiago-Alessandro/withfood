import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

interface Pedido {
    itens: Item[];
    endereco: string
    nomeCliente: string
    nomeEmpresa: string
    status: string
    precoTotal: number
    horaAtual: Date;
}


interface Item {
    nomeItem: string;
    precoItem: number;
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

@Injectable()
export class AuthguardService implements CanActivate {
    logado:Empresa|Cliente
    empresasLista:Empresa[] = []

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        let empresas:Empresa[] = JSON.parse(localStorage.getItem('empresas'))
        if(empresas){
            this.empresasLista = empresas
        }
        let logadoConteudo = JSON.parse(localStorage.getItem('logado')) 
        if(logadoConteudo){

            this.logado = logadoConteudo
        }

        if(this.logado){
            for (let empresa of this.empresasLista ) {

                if(this.logado.email === empresa.email){
                    return true
                }
            }
        }
        alert(' Você precisa logar com a conta de uma empresa para acessar a aba "Empresa" ')
        location.replace('http://localhost:4200/Home')
        return false
        //throw new Error("Method not implemented.");
    }

}