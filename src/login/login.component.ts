
import { JsonPipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";


interface Cliente{
    nome:string,
    email:string,
    telefone:string,
    cpf:string,
    senha:string,
    endereco:string,
}

interface Empresa{
    nome:string,
    email:string,
    telefone:string,
    cnpj:string,
    senha:string,
    numeroContaBancaria:string,
    agencia:string,
    nomeDoResponsavel:string
}

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html'
})

export class LoginComponent implements OnInit{

    senha:string = ""
    email:string = ""

    clientesLista:Cliente[]=[]
    empresasLista:Empresa[]=[]
    
    @Input() logado:Empresa|Cliente = null

    ngOnInit():void{
        let clientes = localStorage.getItem('clientes')
        if(clientes){
            this.clientesLista = JSON.parse(clientes)
        }

        let empresas = localStorage.getItem('empresas')
        if(empresas){
            this.empresasLista = JSON.parse(empresas)
        }
    }

    verificarLogin(){
        if(this.email != "" && this.senha != ""){

            for(let empresa of this.empresasLista){
                if(empresa.email == this.email && empresa.senha == this.senha){
                    this.logado = empresa
                    localStorage.setItem('logado',JSON.stringify(this.logado));
                    window.location.replace("http://localhost:4200/Empresa")
                }
            }
            for(let cliente of this.clientesLista){
                if(cliente.email == this.email && cliente.senha == this.senha){
                    this.logado = cliente
                    localStorage.setItem('logado',JSON.stringify(this.logado));
                    window.location.replace("http://localhost:4200/Cardapio")
                }      
            }
            if(this.logado == null){
                console.log('email ou senha incorretos')
            }
        } else {
            console.log('todos os campos devem ser preenchidos')
        }
    }

    redirecionarParaCadastro(){
        window.location.replace('http://localhost:4200/Cadastro')
    }
    redirecionarParaLogin(){
        window.location.replace('http://localhost:4200/Login')
    }
    redirecionarParaCardapio(){
        window.location.replace('http://localhost:4200/Cardapio')
    }
    redirecionarParaEmpresa(){
        window.location.replace('http://localhost:4200/Empresa')
    }
}