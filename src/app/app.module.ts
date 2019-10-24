import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import 'ag-grid-enterprise';

import { AppComponent } from './app.component';
import { ImageComponent } from './youtube/image/image.component';
import { TitleComponent } from './youtube/title/title.component';
import { CheckboxAllComponent } from './youtube/checkbox-all/checkbox-all.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    TitleComponent,
    CheckboxAllComponent,
  ],
  imports: [
    AgGridModule.withComponents([ImageComponent, TitleComponent, CheckboxAllComponent]),
    BrowserModule,
    HttpClientModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
