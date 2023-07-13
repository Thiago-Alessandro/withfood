import { Injectable } from "@angular/core";
import { CriptografiaService } from "./criptografia.service";
import { Cliente } from "src/models/Cliente";
import { Empresa } from "src/models/Empresa";
import { Cardapio } from "src/models/Cardapio";
import { Pedido } from "src/models/Pedido";

@Injectable()
export class LocalStorageService{

    criptografiaService: CriptografiaService;
    
    //getUser generico
    getUsuarioLogado():Cliente|Empresa{
        let usuarioLogado = localStorage.getItem('logado');
        if(usuarioLogado){
            return JSON.parse(this.criptografiaService.descriptografar(usuarioLogado));
        }
    }

    //getUser do cliente
    getClienteLogado():Cliente{
        const logado = localStorage.getItem('logado');
        if (logado) {
            return JSON.parse(this.criptografiaService.descriptografar(logado));
        }
    }

    //getUser da empresa
    getEmpresaLogada():Empresa{
        const logado = localStorage.getItem('logado');
        if (logado) {
            return JSON.parse(this.criptografiaService.descriptografar(logado));
        }
    }

    getClientes():Cliente[]{
        let clientes = localStorage.getItem('clientes');
        if(clientes){
            return JSON.parse(this.criptografiaService.descriptografar(clientes));
        }
    }

    getEmpresas():Empresa[]{
        let empresas = localStorage.getItem('empresas');
        if(empresas){
            return JSON.parse(this.criptografiaService.descriptografar(empresas));
        } 
    }

    getCardapios():Cardapio[]{
        const cardapios = localStorage.getItem('cardapios');
        if (cardapios) {
            return JSON.parse(this.criptografiaService.descriptografar(cardapios));
        }
    }

    getPedidos():Pedido[]{
        return //tem q ver esse aqui certinho la em empresa pq foi feito outra coisa
    }


    // removeUsuarioLogado(){}
    
    getLogoLaranja():string{
        return "./assets/imagens/logoLaranja.png"
    }
    getLogoPequena():string{
        return './assets/imagens/logoPequena.svg'
    }
    getImagemEmail():string{
        return "./assets/imagens/email.svg"
    }
}