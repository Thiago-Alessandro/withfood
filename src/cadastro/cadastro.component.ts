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

    clientesLista:Cliente[]=[]
    empresasLista:Empresa[]=[]
    incadastravelEmpresa: boolean = false;
    incadastravelCliente: boolean = false;
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

    // mostraCliente(){
    //     this.abaEmpresa = false;
    // }
    // mostraEmpresa(){
    //     this.abaEmpresa = true;
    // }

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

        for (let i=0; i<this.empresasLista.length;i++){
            if (this.empresasLista.length>=1){
            if (this.empresasLista[i].cnpj == this.cnpj){
                this.incadastravelEmpresa = true;
            }
            if (this.empresasLista[i].email == this.email){
                this.incadastravelEmpresa = true;
            }
        }
        if (this.clientesLista.length>=1){
        if ( this.clientesLista[i].email == this.email){
            this.incadastravelEmpresa = true;
        }
    }
        }

        if (this.incadastravelEmpresa==false){
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
                this.incadastravelCliente = false;
                this.confirmaSenha = true;
                this.preenchido = true;
                window.location.replace("http://localhost:4200/Login")

            }else{
                this.preenchido = true;
                this.confirmaSenha = false;
                this.confirmacaoSenha = ""
            }
        }else{
            this.incadastravelEmpresa = false;
           this.preenchido = false;
        }
    } else {
        this.cnpj = ''
        this.email = ''
    }
}
  
    cadastrarCliente():void{
        for (let i=0; i<this.clientesLista.length;i++){
            console.log("entrei no for")
           if (this.clientesLista.length>=1){
            console.log("entrei no if length")
            if (this.clientesLista[i].cpf == this.cpf){
                console.log("entrei no if cpf")
                this.incadastravelCliente = true;
            }
            console.log(this.clientesLista[i].email)
            if (this.clientesLista[i].email == this.email){
                console.log("entrei no if email clientes")

                this.incadastravelCliente = true;
            }
        } 
        if (this.empresasLista.length>=1){
            if (this.empresasLista[i].email == this.email){
                this.incadastravelCliente == true;
            }
        }
        }

        if (this.incadastravelCliente==false){
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
                this.incadastravelCliente = false;
                this.confirmaSenha = true;
                this.preenchido = true;
                window.location.replace("http://localhost:4200/Login")

            }else{
                this.preenchido = true;
                this.confirmaSenha = false;
                this.confirmacaoSenha = ""
            }
        }else{
            this.incadastravelCliente = false;
            this.preenchido = false;
        }
    } else {
        this.cpf = ''
        this.email = ''
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