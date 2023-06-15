import { Component } from "@angular/core";


interface Cliente{
    nome:string,
    email:string,
    telefone:string,
    cpf:string,
    senha:string,
    endereco:string
}


@Component({
    selector: "app-cadastro",
    templateUrl:'./cadastro.component.html',
    styleUrls:['./cadastro.component.css']
})

export class CadastroComponent{

    clientesLista:Cliente[]=[] 

    nomeCliente:string = ""
    emailCliente:string = ""
    telefoneCliente:string = ""
    cpfCliente:string = ""
    senhaCliente:string = ""
    confirmacaoSenhaCliente:string = ""
    EnderecoCliente:string = ""

    cadastrarCliente():void{

        if(this.verificarCamposPreenchidosCliente()){
            
            let clienteCadastrado:Cliente = {

                nome:this.nomeCliente,
                email:this.emailCliente,
                telefone:this.telefoneCliente,
                cpf:this.cpfCliente,
                senha:this.senhaCliente,
                endereco:this.EnderecoCliente
            }

            this.clientesLista.push(clienteCadastrado)

            localStorage.setItem("Cliente",JSON.stringify(this.clientesLista))

            this.nomeCliente = ""
            this.emailCliente = ""
            this.telefoneCliente = ""
            this.cpfCliente = ""
            this.senhaCliente = ""
            this.confirmacaoSenhaCliente = ""
            this.EnderecoCliente = ""
        }
        console.log("preencha todos os campos")
    }

    verificarCamposPreenchidosCliente():boolean{

        if(this.nomeCliente == "" || this.emailCliente == "" || this.telefoneCliente == "" ||
            this.cpfCliente == "" || this.senhaCliente == "" || this.confirmacaoSenhaCliente == "" ||
            this.EnderecoCliente == ""){
                
            return false
        }
        return true
    }
    verificarSenhaConfirmada():boolean{//talve receber parametro
        return
    }
    
}