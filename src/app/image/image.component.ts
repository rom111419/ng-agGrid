import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  params: any;

  constructor() {}

  ngOnInit() {}

  agInit(params: any): void {
    this.params = params;
  }

}
