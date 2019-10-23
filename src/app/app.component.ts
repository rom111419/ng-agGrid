import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ImageComponent } from 'src/app/youtube/image/image.component';
import { SubscriptionStorage } from 'src/app/subscription-stоrage/subscription-storage';
import { TitleComponent } from 'src/app/youtube/title/title.component';
import { YoutubeService } from 'src/app/youtube/youtube.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  columnDefs = [
    {
      headerName: '',
      field: 'checkboxes',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true
    },
    {headerName: '', field: 'thumbnails', cellRendererFramework: ImageComponent},
    {headerName: 'Published on', field: 'publishedAt'},
    {headerName: 'Video Title', field: 'title', cellRendererFramework: TitleComponent},
    {headerName: 'Description', field: 'description'}
  ];
  youtubeItemSnippets = [];
  youtubeCheckboxedItemsNumber = 0;
  subscription: Subscription = new Subscription();
  private gridApi;
  private gridColumnApi;
  private selected;
  private popupParent;

  constructor(private http: HttpClient,
              private youtubeService: YoutubeService) {
    this.popupParent = document.querySelector('body');
  }

  ngOnInit() {
    this.subscription.add(
      this.youtubeService
        .getYoutubeList()
        .subscribe(youtubeList => {
          this.youtubeItemSnippets = youtubeList.items.map((youtubeItem) => youtubeItem.snippet);
        })
    );
  }

  onSelectionChanged($event?: any) {
    this.youtubeCheckboxedItemsNumber = this.gridApi.getSelectedNodes().length;
    return $event;
  }

  onSelectAllChanged() {
    this.gridApi.forEachNode((node) => {
      this.selected = !node.selected;
      node.setSelected((!node.selected));
    });
  }

  onSelectionModeChanged() {
    this.gridColumnApi.setColumnVisible('checkboxes', (!this.gridColumnApi.getColumn('checkboxes').visible));
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.setColumnVisible('checkboxes', false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
