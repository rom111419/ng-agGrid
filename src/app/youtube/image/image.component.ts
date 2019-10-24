import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  width: any;
  height: any;
  url: any;

  constructor() {}

  ngOnInit() {}

  agInit(params: any): void {
    this.width = params.value.default.width;
    this.height = params.value.default.height;
    this.url = params.value.default.url;
  }

}
