import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from 'src/home/home.module';
import { CadastroModule } from 'src/cadastro/cadastro.module';
import { LoginModule } from 'src/login/login.module';
import { CardapioModule } from 'src/Cardapio/cardapio.module';
import { EmpresaModule } from 'src/Empresa/empresa.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CadastroModule,
    LoginModule,
    CardapioModule,
    EmpresaModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
