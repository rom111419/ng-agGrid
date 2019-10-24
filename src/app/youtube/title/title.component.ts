import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  params: any;
  videoId: string;

  constructor() {}

  ngOnInit() {}

  agInit(params: any): void {
    this.params = params.value;
    this.videoId = params.data.videoId;
  }

}
