import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EmpresaComponent } from "./empresa.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        EmpresaComponent
    ],
    imports:[
        CommonModule,
        FormsModule
        
    ]
})

export class EmpresaModule {
    
}