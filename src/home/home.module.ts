import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common"
import { CriptografiaService } from "src/services/criptografia.service";

@NgModule
({
    declarations:[
        HomeComponent
    ],
    exports:[
        CommonModule
    ],
    providers:[
        CriptografiaService
    ]
})

export class HomeModule {

}