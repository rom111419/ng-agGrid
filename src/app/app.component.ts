import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  title = 'app';
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
  protected subs: SubscriptionStorage = new SubscriptionStorage();
  private gridApi;
  private gridColumnApi;
  private selected;
  private popupParent;

  constructor(private http: HttpClient,
              private youtubeService: YoutubeService) {
    this.popupParent = document.querySelector('body');
  }

  ngOnInit() {
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

  onSelectionChanged($event?: any) {
    this.youtubeCheckboxedItemsNumber = $event.api.clientSideRowModel.rootNode.allLeafChildren.filter(item => item.selected).length;
    return $event;
  }

  onSelectAllChanged($event: any) {
    this.gridApi.forEachNode((node) => {
      this.selected = !node.selected;
      node.setSelected((!node.selected));
    });
  }

  onSelectionModeChanged() {
    const visibility = this.gridColumnApi.getAllColumns().filter(item => item.colId === 'checkboxes')[0].visible;
    this.gridColumnApi.setColumnVisible('checkboxes', (!visibility));
  }

  getMainMenuItems(params) {
    console.log(params.column);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.setColumnVisible('checkboxes', false);
    this.subscribeOnYoutubeList();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
