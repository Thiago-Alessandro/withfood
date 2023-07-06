import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardapioComponent } from "./cardapio.component";
import { FormsModule } from "@angular/forms";
import { CriptografiaService } from "src/services/criptografia.service";

@NgModule({
    declarations:[
        CardapioComponent
    ],
    imports:[
        CommonModule,
        FormsModule
    ],
    providers:[
        CriptografiaService
    ]
})

export class CardapioModule{
    
}