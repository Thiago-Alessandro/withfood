import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

// interface Pedido {
//     itens: Item[];
//     endereco: string
//     nomeCliente: string
//     nomeEmpresa: string
//     status: string
//     precoTotal: number
//     horaAtual: Date;
// }


// interface Item {
//     nomeItem: string;
//     precoItem: number;
// }

// interface Cliente{
//     nome:string,
//     email:string,
//     telefone:string,
//     cpf:string,
//     senha:string,
//     endereco:string,
//     historico: Pedido[];
// }

// interface Empresa {
//     nome: string,
//     email: string,
//     telefone: string,
//     cnpj: string,
//     senha: string,
//     numeroContaBancaria: string,
//     agencia: string,
//     nomeDoResponsavel: string
//     //cardapio    :Cardapio
// }

@Injectable()
export class CriptografiaService {

    criptografar(stringACriptografar:string):string{
        if(stringACriptografar){
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
    return null
    }
    
    descriptografar(stringADescriptografar:string):string{
        if(stringADescriptografar){
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
        return null
    }

    // logado:Empresa|Cliente
    // empresasLista:Empresa[] = []

    // canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    //     let empresas:Empresa[] = JSON.parse(localStorage.getItem('empresas'))
    //     if(empresas){
    //         this.empresasLista = empresas
    //     }
    //     let logadoConteudo = JSON.parse(localStorage.getItem('logado')) 
    //     if(logadoConteudo){

    //         this.logado = logadoConteudo
    //     }

    //     if(this.logado){
    //         for (let empresa of this.empresasLista ) {

    //             if(this.logado.email === empresa.email){
    //                 return true
    //             }
    //         }
    //     }
    //     alert(' Você precisa logar com a conta de uma empresa para acessar a aba "Empresa" ')
    //     location.replace('http://localhost:4200/Home')
    //     return false
    //     //throw new Error("Method not implemented.");
    // }

}