import { Component, OnInit, ViewChild } from "@angular/core";

interface Cliente{
    nome:string,
    email:string,
    telefone:string,
    cpf:string,
    senha:string,
    endereco:string
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
    selector: "app-cadastro",
    templateUrl:'./cadastro.component.html',
    styleUrls:['./cadastro.component.css']
})

export class CadastroComponent implements OnInit{

    logoLaranja: string;
    clientesLista:Cliente[]=[]
    empresasLista:Empresa[]=[]

    //variaveis em comum Empresa  e Cliente
    nome:string = ""
    email:string = ""
    telefone:string = ""
    senha:string = ""
    confirmacaoSenha:string = ""

    //variaveis exclusivas Cliente
    cpf:string = ""
    Endereco:string = ""

    //variaveis exclusivas Empresa
    cnpj:string
    numeroContaBancaria:string
    agencia:string
    nomeDoResponsavelDaEmpresa:string

    cadastrandoCliente:boolean = true

   //pega a div com o #cabecalhoEmpresa e coloca numa variavel de mesmo nome
    @ViewChild('cabecalhoEmpresa') cabecalhoEmpresa;
    //inicia uma variavel que vai ter o texto do cabecalho (o elemento 'p' do html)
    textoCabecalhoEmpresa

    @ViewChild('cabecalhoCliente') cabecalhoCliente;
    textoCabecalhoCliente

    ngOnInit():void{
        
        this.logoLaranja =  './assets/imagens/logoLaranja.png'
        this.cabecalhoEmpresa = this.cabecalhoEmpresa.nativeElement
        this.textoCabecalhoEmpresa = this.cabecalhoEmpresa.children[0]
        this.cabecalhoEmpresa.className = 'cabecalhoNaoSelecionado'
        this.textoCabecalhoEmpresa.className = 'cabecalhoNaoSelecionado'

        this.cabecalhoCliente = this.cabecalhoCliente.nativeElement
        this.textoCabecalhoCliente = this.cabecalhoCliente.children[0]
        this.cabecalhoCliente.className = 'cabecalhoSelecionado'
        this.textoCabecalhoCliente.className = 'cabecalhoSelecionado'

        let clientes = localStorage.getItem('clientes')
        if(clientes){
            this.clientesLista.push(JSON.parse(clientes))
        }

        let empresas = localStorage.getItem('empresas')
        if(empresas){
            this.empresasLista.push(JSON.parse(empresas))
        }
    }

    selecionarCadastroEmpresa():void{

        this.cadastrandoCliente=false
        
        this.cabecalhoEmpresa.className = 'cabecalhoSelecionado'
        this.textoCabecalhoEmpresa.className = "cabecalhoSelecionado"

        this.cabecalhoCliente.className = 'cabecalhoNaoSelecionado'
        this.textoCabecalhoCliente.className = 'cabecalhoNaoSelecionado'
    }

    selecionarCadastroCliente():void{

        this.cadastrandoCliente=true

        this.cabecalhoCliente.className = 'cabecalhoSelecionado'
        this.textoCabecalhoCliente.className = 'cabecalhoSelecionado'

        this.cabecalhoEmpresa.className = 'cabecalhoNaoSelecionado'
        this.textoCabecalhoEmpresa.className = 'cabecalhoNaoSelecionado'
    }

    cadastrarEmpresa():void{

        if(this.verificarCamposPreenchidosEmpresa()){

            if(this.verificarSenhaConfirmada(this.senha, this.confirmacaoSenha)){

                let empresaCadastrada:Empresa = {
                    
                    nome:this.nome,
                    email:this.email,
                    telefone:this.telefone,
                    senha:this.senha,
                    cnpj:this.cnpj,
                    numeroContaBancaria:this.numeroContaBancaria,
                    agencia:this.agencia,
                    nomeDoResponsavel:this.nomeDoResponsavelDaEmpresa
                }

                this.empresasLista.push(empresaCadastrada)

                localStorage.setItem("empresas", JSON.stringify(this.empresasLista))

                this.nome = ""
                this.email = ""
                this.telefone = ""
                this.senha = ""
                this.cnpj = ""
                this.numeroContaBancaria = ""
                this.agencia = ""
                this.nomeDoResponsavelDaEmpresa = ""

                window.location.replace("http://localhost:4200/Login")

            }else{
                console.log("A sua senha deve ser a mesma em ambos os inputs")
                this.confirmacaoSenha = ""
            }
        }else{
            console.log("preencha todos os campos")
        }
    }
  
    cadastrarCliente():void{

        if(this.verificarCamposPreenchidosCliente()){
            if(this.verificarSenhaConfirmada(this.senha,this.confirmacaoSenha)){
                let clienteCadastrado:Cliente = {

                    nome:this.nome,
                    email:this.email,
                    telefone:this.telefone,
                    cpf:this.cpf,
                    senha:this.senha,
                    endereco:this.Endereco
                }

                this.clientesLista.push(clienteCadastrado)

                localStorage.setItem("clientes",JSON.stringify(this.clientesLista))

                this.nome = ""
                this.email = ""
                this.telefone = ""
                this.cpf = ""
                this.senha = ""
                this.confirmacaoSenha = ""
                this.Endereco = ""

                window.location.replace("http://localhost:4200/Login")

            }else{
                console.log("A sua senha deve ser a mesma em ambos os inputs")
                this.confirmacaoSenha = ""
            }
        }else{
            console.log("preencha todos os campos")
        }
        
    }
    
    verificarCamposPreenchidosCliente():boolean{

        if(this.nome == "" || this.email == "" || this.telefone == "" ||
            this.cpf == "" || this.senha == "" || this.confirmacaoSenha == "" ||
            this.Endereco == ""){
                
            return false
        }
        return true
    }
    verificarCamposPreenchidosEmpresa():boolean{
        if(this.nome == "" || this.email == "" || this.telefone == "" ||
        this.cnpj == "" || this.senha == "" || this.confirmacaoSenha == "" ||
        this.numeroContaBancaria == "" || this.agencia == "" || this.nomeDoResponsavelDaEmpresa == ""){
            return false
        }
        return true
    }

    verificarSenhaConfirmada(senha:string, confirmacao:string):boolean{//talve receber parametro
        if(senha === confirmacao){
            return true
        }
        return false
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