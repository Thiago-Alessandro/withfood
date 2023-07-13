import { Component, OnInit, ViewChild } from "@angular/core";
import { CriptografiaService } from "src/services/criptografia.service";
//import { Console } from "console";
interface Pedido {
    itens: Item[];
    endereco: string;
    nomeCliente: string;
    //nomeEmpresa: string;
    status: string;
    precoTotal: number;
    horaAtual: Date;
}
interface Item {
    nomeItem: string;
    precoItem: number;
    nomeEmpresa: string
}

interface Cliente {
    nome: string,
    email: string,
    telefone: string,
    cpf: string,
    senha: string,
    endereco: string,
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
}

@Component({
    selector: "app-cadastro",
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

    constructor(
        private criptografiaService: CriptografiaService
    ) { }

    clientesLista: Cliente[] = []
    empresasLista: Empresa[] = []
    preenchido: boolean = true;
    confirmaSenha: boolean = true;

    /* Variáveis em comum Empresa  e Cliente */
    nome: string = ""
    email: string = ""
    telefone: string = ""
    senha: string = ""
    confirmacaoSenha: string = ""

    /* Variaveis exclusivas Cliente */
    cpf: string = ""
    Endereco: string = ""

    /* Variáveis exclusivas Empresa */
    cnpj: string
    numeroContaBancaria: string
    agencia: string
    nomeDoResponsavelDaEmpresa: string

    cadastrandoCliente: boolean = true

    /* Identifica a div com o #cabecalhoEmpresa e coloca numa variavel */
    @ViewChild('cabecalhoEmpresa') cabecalhoEmpresa;
    /*Inicializa uma variável que irá possuir o texto do cabecalho (o elemento 'p' do html)*/
    textoCabecalhoEmpresa;

    /* Identifica a div com o #cabecalhoCliente e coloca numa variavel */
    @ViewChild('cabecalhoCliente') cabecalhoCliente;
    /*Inicializa uma variável que irá possuir o texto do cabecalho (o elemento 'p' do html)*/
    textoCabecalhoCliente;

    ngOnInit(): void {
        this.cabecalhoEmpresa = this.cabecalhoEmpresa.nativeElement
        this.textoCabecalhoEmpresa = this.cabecalhoEmpresa.children[0]
        this.cabecalhoEmpresa.className = 'unselected-header'
        this.textoCabecalhoEmpresa.className = 'unselected-header'

        this.cabecalhoCliente = this.cabecalhoCliente.nativeElement
        this.textoCabecalhoCliente = this.cabecalhoCliente.children[0]
        this.cabecalhoCliente.className = 'selected-header'
        this.textoCabecalhoCliente.className = 'selected-header'

        let clientes = this.criptografiaService.descriptografar(localStorage.getItem('clientes'))
        if (clientes) {
            this.clientesLista = JSON.parse(clientes)
        }

        let empresas = this.criptografiaService.descriptografar(localStorage.getItem('empresas'))
        if (empresas) {
            this.empresasLista = JSON.parse(empresas)
        }
    }

    selecionarCadastroEmpresa(): void {

        if (this.cadastrandoCliente) {
            this.limparCampos()
        }

        this.cadastrandoCliente = false

        this.cabecalhoEmpresa.className = 'selected-header'
        this.textoCabecalhoEmpresa.className = "selected-header"

        this.cabecalhoCliente.className = 'unselected-header'
        this.textoCabecalhoCliente.className = 'unselected-header'
    }

    selecionarCadastroCliente(): void {

        if (!this.cadastrandoCliente) {
            this.limparCampos()
        }
        this.cadastrandoCliente = true

        this.cabecalhoCliente.className = 'selected-header'
        this.textoCabecalhoCliente.className = 'selected-header'

        this.cabecalhoEmpresa.className = 'unselected-header'
        this.textoCabecalhoEmpresa.className = 'unselected-header'
    }

    verificarEmpresaCadastravel(): boolean {
        for (let i = 0; i < this.empresasLista.length; i++) {
            if (this.empresasLista.length >= 1) {
                if (this.empresasLista[i].cnpj == this.cnpj) {
                    return false
                }
                if (this.empresasLista[i].email == this.email) {
                    return false
                }
            }
            for (let cliente of this.clientesLista) {
                if (cliente.email == this.email) {
                    return false
                }
            }
        }
        return true
    }

    cadastrarEmpresa(): void {

        if (this.verificarEmpresaCadastravel()) {

            if (this.verificarCamposPreenchidosEmpresa()) {
                if (this.verificarSenhaConfirmada(this.senha, this.confirmacaoSenha)) {

                    let empresaCadastrada: Empresa = {

                        nome: this.nome,
                        email: this.email,
                        telefone: this.telefone,
                        senha: this.senha,
                        cnpj: this.cnpj,
                        numeroContaBancaria: this.numeroContaBancaria,
                        agencia: this.agencia,
                        nomeDoResponsavel: this.nomeDoResponsavelDaEmpresa
                    }

                    this.empresasLista.push(empresaCadastrada)

                    localStorage.setItem("empresas", this.criptografiaService.criptografar(JSON.stringify(this.empresasLista)))

                    this.confirmaSenha = true;
                    this.preenchido = true;

                    this.limparCampos()

                    window.location.replace("http://localhost:4200/Login")

                } else {
                    this.preenchido = true;
                    this.confirmaSenha = false;
                    this.confirmacaoSenha = ""
                }
            } else {
                this.preenchido = false;
                alert('Preencha todos os campos!')
            }
        } else {
            this.cnpj = ''
            this.email = ''
            alert('CPF ou Email já foram cadastrados.')
        }
    }

    cadastrarCliente(): void {

        if (this.verificarClienteCadastravel()) {
            if (this.verificarCamposPreenchidosCliente()) {
                if (this.verificarSenhaConfirmada(this.senha, this.confirmacaoSenha)) {

                    let clienteCadastrado: Cliente = {

                        nome: this.nome,
                        email: this.email,
                        telefone: this.telefone,
                        cpf: this.cpf,
                        senha: this.senha,
                        endereco: this.Endereco,
                        historico: []
                    }

                    this.clientesLista.push(clienteCadastrado)

                    localStorage.setItem("clientes", this.criptografiaService.criptografar(JSON.stringify(this.clientesLista)))

                    this.limparCampos()

                    this.confirmaSenha = true;
                    this.preenchido = true;
                    window.location.replace("http://localhost:4200/Login")

                } else {
                    this.preenchido = true;
                    this.confirmaSenha = false;
                    this.confirmacaoSenha = ""
                }
            } else {
                this.preenchido = false;
            }
        } else {
            this.cpf = ''
            this.email = ''
            alert('CPF ou Email já foram cadastrados')
        }
    }

    verificarClienteCadastravel(): boolean {
        for (let i = 0; i < this.clientesLista.length; i++) {
            if (this.clientesLista.length >= 1) {
                if (this.clientesLista[i].cpf == this.cpf) {
                    return false
                }
                //console.log(this.clientesLista[i].email)
                if (this.clientesLista[i].email == this.email) {
                    return false
                }
            }
            for (let empresa of this.empresasLista) {
                if (empresa.email == this.email) {
                    return false
                }
            }
        }
        return true
    }

    limparCampos() {
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

    verificarCamposPreenchidosCliente(): boolean {

        if (this.nome == "" || this.email == "" || this.telefone == "" ||
            this.cpf == "" || this.senha == "" || this.confirmacaoSenha == "" ||
            this.Endereco == "") {

            return false
        }
        return true
    }
    verificarCamposPreenchidosEmpresa(): boolean {
        if (this.nome == "" || this.email == "" || this.telefone == "" ||
            this.cnpj == "" || this.senha == "" || this.confirmacaoSenha == "" ||
            this.numeroContaBancaria == "" || this.agencia == "" || this.nomeDoResponsavelDaEmpresa == "") {
            return false
        }
        return true
    }

    verificarSenhaConfirmada(senha: string, confirmacao: string): boolean {//talve receber parametro
        if (senha === confirmacao) {
            return true
        }
        return false
    }

    redirecionarParaLogin() {
        window.location.replace('http://localhost:4200/Login')
    }
    redirecionarParaCardapio() {
        window.location.replace('http://localhost:4200/Cardapio')
    }
    redirecionarParaEmpresa() {
        window.location.replace('http://localhost:4200/Empresa')
    }

}