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
            this.clientesLista.push(JSON.parse(clientes))
        }

        let empresas = localStorage.getItem('empresas')
        if(empresas){
            this.empresasLista.push(JSON.parse(empresas))
        }
    }

    verificarLogin(){
        if(this.email != "" && this.senha != ""){

            this.empresasLista.forEach(empresa => {
                
                if(JSON.stringify(empresa).includes('"email":"' + this.email + '"') &&
                 JSON.stringify(empresa).includes('"senha":"' + this.senha + '"')){

                    this.logado = empresa
                    window.location.replace("http://localhost:4200/Empresa")
                }
            });
            this.clientesLista.forEach((cliente) => {
                // console.log('objeto inteiro: ' + JSON.stringify(cliente))
                // console.log('so o email ' + JSON.stringify(cliente.email))
                // console.log('so o email sem o stringify ' + cliente.email)
                // console.log("sem o stringify " + cliente)
                // console.log('email e senha dos inputs' + this.email + " " + this.senha)
                if(JSON.stringify(cliente).includes('"email":"' + this.email+'"' ) &&
                 JSON.stringify(cliente).includes('"senha":"' + this.senha + '"')){
                    this.logado = cliente
                    window.location.replace("http://localhost:4200/Cardapio")
                }
            });
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

}