import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EmpresaComponent } from "./empresa.component";
import { FormsModule } from "@angular/forms";
import { CriptografiaService } from "src/services/criptografia.service";

@NgModule({
    declarations:[
        EmpresaComponent
    ],
    imports:[
        CommonModule,
        FormsModule   
    ],
    providers:[
        CriptografiaService
    ]
})

export class EmpresaModule {
    
}