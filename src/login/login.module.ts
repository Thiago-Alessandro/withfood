import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"
import { CriptografiaService } from "src/services/criptografia.service";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers:[
        CriptografiaService
    ]
})

export class LoginModule {
    
}