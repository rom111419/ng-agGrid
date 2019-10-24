import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AgGridModule } from 'ag-grid-angular';
import { ImageComponent } from 'src/app/youtube/image/image.component';
import { TitleComponent } from 'src/app/youtube/title/title.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('The data from the API should be rendered in the grid. The following fields should be presented in the data grid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.columnDefs[0].field).toEqual('checkboxes');
    expect(fixture.componentInstance.columnDefs[1].field).toEqual('thumbnails');
    expect(fixture.componentInstance.columnDefs[2].field).toEqual('publishedAt');
    expect(fixture.componentInstance.columnDefs[3].field).toEqual('title');
    expect(fixture.componentInstance.columnDefs[4].field).toEqual('description');
  });
});
