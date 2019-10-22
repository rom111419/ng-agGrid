import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ImageComponent } from 'src/app/image/image.component';
import { SubscriptionStorage } from 'src/app/subscription-stоrage/subscription-storage';
import { TitleComponent } from 'src/app/title/title.component';
import { IYoutubeItem, IYoutubeItemSnippet, IYoutubeList } from 'src/app/youtube-item';
import { YoutubeService } from 'src/app/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  columnDefs = [
    {headerName: '', field: 'thumbnails',  sortable: true, filter: true, cellRendererFramework: ImageComponent},
    {headerName: 'Published on', field: 'publishedAt',  sortable: true, filter: true },
    {headerName: 'Video Title', field: 'title',  sortable: true, filter: true, cellRendererFramework: TitleComponent},
    {headerName: 'Description', field: 'description',  sortable: true, filter: true }
  ];
  youtubeList: IYoutubeList;
  youtubeItemSnippets = [];
  protected subs: SubscriptionStorage = new SubscriptionStorage();

  constructor(private http: HttpClient,
              private youtubeService: YoutubeService) {
  }

  ngOnInit() {
    this.subscribeOnYoutubeList();
  }

  subscribeOnYoutubeList() {
    this.youtubeService
      .getYoutubeList()
      .subscribe(youtubeList => {
        this.youtubeItemSnippets = youtubeList.items.map((youtubeItem) => {
          Object.assign(youtubeItem.snippet, youtubeItem.id);
          return youtubeItem.snippet;
        });
      });

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
