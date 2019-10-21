import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YoutubeService } from 'src/app/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  columnDefs = [
    {headerName: 'thumbnails', field: 'thumbnails'},
    {headerName: 'publishedAt', field: 'publishedAt'},
    {headerName: 'title', field: 'title'},
    {headerName: 'description', field: 'description'}
  ];

  rowData: any;

  constructor(private http: HttpClient,
              private youtubeService: YoutubeService) {
  }

  ngOnInit() {
    this.youtubeService.getListVideo().subscribe(item => console.log(item));
  }

}
