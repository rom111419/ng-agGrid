import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'ag-grid-enterprise';

import { AppComponent } from './app.component';
import { ImageComponent } from './youtube/image/image.component';
import { TitleComponent } from './youtube/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    TitleComponent,
  ],
  imports: [
    AgGridModule.withComponents([ImageComponent, TitleComponent]),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
