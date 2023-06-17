import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CadastroComponent } from "src/cadastro/cadastro.component";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "src/login/login.component";
import { CardapioComponent } from "src/Cardapio/cardapio.component";
import { EmpresaComponent } from "src/Empresa/empresa.component";

const rotas:Route[] = [
    {
        path:'Home',
        component: HomeComponent
    },
    {
        path:'Login',
        component:LoginComponent
    },
    {
        path:'Cadastro',
        component: CadastroComponent
    },
    {
        path:'Cardapio',
        component: CardapioComponent
    },
    {
        path:'Empresa',
        component: EmpresaComponent
    },
    {
        path:'',
        redirectTo:'Home',
        pathMatch:'full'
        
    }
]

@NgModule({
    imports:[RouterModule.forRoot(rotas)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}
