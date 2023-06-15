import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common"

@NgModule
({
    declarations:[
        HomeComponent
    ],
    exports:[
        CommonModule
    ]
})

export class HomeModule {

}