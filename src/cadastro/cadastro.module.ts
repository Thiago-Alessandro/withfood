import { NgModule } from "@angular/core";
import { CadastroComponent } from "./cadastro.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CriptografiaService } from "src/services/criptografia.service";
import { LocalStorageService } from "src/services/local-storage.service";

@NgModule({
    declarations:[
        CadastroComponent
    ],
    imports:[
        CommonModule,
        FormsModule
    ],
    providers:[
        CriptografiaService,
        LocalStorageService
    ]
})

export class CadastroModule{
    
}