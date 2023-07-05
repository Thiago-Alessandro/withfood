import { Component, OnInit, ViewChild } from "@angular/core";
//import { Console } from "console";
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

    clientesLista:Cliente[]=[]
    empresasLista:Empresa[]=[]
    preenchido:boolean = true;
    confirmaSenha: boolean = true;
    // abaEmpresa: boolean;

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
    textoCabecalhoEmpresa;

    @ViewChild('cabecalhoCliente') cabecalhoCliente;
    textoCabecalhoCliente;

    ngOnInit():void{
        // let aba = localStorage.getItem('booleanAba');
        // this.abaEmpresa =JSON.parse(aba);
        // if(this.abaEmpresa ==  true){
        //     console.log("entrei")
        //     this.selecionarCadastroEmpresa()
        // }
        // console.log(this.abaEmpresa)
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
            this.clientesLista =JSON.parse(clientes)
        }

        let empresas = localStorage.getItem('empresas')
        if(empresas){
            this.empresasLista = JSON.parse(empresas)
        }
    }

    selecionarCadastroEmpresa():void{

        if(this.cadastrandoCliente){
            this.limparCampos()
        }

        this.cadastrandoCliente=false
        
        this.cabecalhoEmpresa.className = 'cabecalhoSelecionado'
        this.textoCabecalhoEmpresa.className = "cabecalhoSelecionado"

        this.cabecalhoCliente.className = 'cabecalhoNaoSelecionado'
        this.textoCabecalhoCliente.className = 'cabecalhoNaoSelecionado'
    }

    selecionarCadastroCliente():void{

        if(!this.cadastrandoCliente){
            this.limparCampos()
        }
        this.cadastrandoCliente=true

        this.cabecalhoCliente.className = 'cabecalhoSelecionado'
        this.textoCabecalhoCliente.className = 'cabecalhoSelecionado'

        this.cabecalhoEmpresa.className = 'cabecalhoNaoSelecionado'
        this.textoCabecalhoEmpresa.className = 'cabecalhoNaoSelecionado'
    }

    verificarEmpresaCadastravel():boolean{
        for (let i=0; i<this.empresasLista.length;i++){
            if (this.empresasLista.length>=1){
                if (this.empresasLista[i].cnpj == this.cnpj){
                    return false 
                }
                if (this.empresasLista[i].email == this.email){
                    return false
                }
            }
            for(let cliente of this.clientesLista){
                if(cliente.email == this.email){
                    return false
                }
            }
        }
        return true
    }

    cadastrarEmpresa():void{

        if (this.verificarEmpresaCadastravel()){
            alert(this.verificarCamposPreenchidosEmpresa());
            
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

                    this.confirmaSenha = true;
                    this.preenchido = true;

                    this.limparCampos()

                    window.location.replace("http://localhost:4200/Login")

                }else{
                    this.preenchido = true;
                    this.confirmaSenha = false;
                    this.confirmacaoSenha = ""
                }
            }else{
            this.preenchido = false;
            alert('OS CAMPOS N TAO PREENCHIDOS AMIGAO')
            }
    } else {
        this.cnpj = ''
        this.email = ''
        alert('CPF ou Email já foram cadastrados.')
    }
}
  
    cadastrarCliente():void{

        if (this.verificarClienteCadastravel()){
            if(this.verificarCamposPreenchidosCliente()){
                if(this.verificarSenhaConfirmada(this.senha,this.confirmacaoSenha)){
                    
                    let clienteCadastrado:Cliente = {

                        nome:this.nome,
                        email:this.email,
                        telefone:this.telefone,
                        cpf:this.cpf,
                        senha:this.senha,
                        endereco:this.Endereco,
                        historico: []
                    }

                    this.clientesLista.push(clienteCadastrado)

                    localStorage.setItem("clientes",JSON.stringify(this.clientesLista))

                    this.limparCampos()

                    this.confirmaSenha = true;
                    this.preenchido = true;
                    window.location.replace("http://localhost:4200/Login")

                }else{
                    this.preenchido = true;
                    this.confirmaSenha = false;
                    this.confirmacaoSenha = ""
                }
            }else{
                this.preenchido = false;
            }
        } else {
            this.cpf = ''
            this.email = ''
            alert('CPF ou Email já foram cadastrados')
        }
    }
    
    verificarClienteCadastravel():boolean{
        for (let i=0; i<this.clientesLista.length;i++){
           if (this.clientesLista.length>=1){
                if (this.clientesLista[i].cpf == this.cpf){
                    return false
                }
                //console.log(this.clientesLista[i].email)
                if (this.clientesLista[i].email == this.email){
                    return false
                }
        } 
         for (let empresa of this.empresasLista){
            if(empresa.email == this.email){
                return false
            }
         }
        }
        return true
    }

    limparCampos(){
        this.cpf = ""
        this.confirmacaoSenha = ""
        this.Endereco = ""

        this.nome = ""
        this.email = ""
        this.telefone = ""
        this.senha = ""
        this.cnpj = ""
        this.numeroContaBancaria = ""
        this.agencia = ""
        this.nomeDoResponsavelDaEmpresa = ""
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