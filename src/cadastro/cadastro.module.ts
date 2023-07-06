import { NgModule } from "@angular/core";
import { CadastroComponent } from "./cadastro.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CriptografiaService } from "src/services/criptografia.service";

@NgModule({
    declarations:[
        CadastroComponent
    ],
    imports:[
        CommonModule,
        FormsModule
    ],
    providers:[
        CriptografiaService
    ]
})

export class CadastroModule{
    
}