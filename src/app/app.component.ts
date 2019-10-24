import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageComponent } from 'src/app/youtube/image/image.component';
import { TitleComponent } from 'src/app/youtube/title/title.component';
import { YoutubeService } from 'src/app/youtube/youtube.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  columnDefs = [
    {
      headerName: '',
      field: 'checkboxes',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 80
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
  protected statusBar;
  protected popupParent;

  constructor(private http: HttpClient,
              private youtubeService: YoutubeService,
              public cd: ChangeDetectorRef
              ) {
    this.popupParent = document.querySelector('body');
  }

  ngOnInit() {
    this.subscription.add(
      this.youtubeService
        .getYoutubeList()
        .subscribe(youtubeList => {
          this.youtubeItemSnippets = youtubeList.items.map((youtubeItem) => {
            Object.assign(youtubeItem.snippet, youtubeItem.id);
            return youtubeItem.snippet;
          });
        })
    );
  }

  onSelectionChanged() {
    this.youtubeCheckboxedItemsNumber = this.gridApi.getSelectedNodes().length;
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

  getContextMenuItems(params) {
    console.log(params);
    const url = 'https://www.youtube.com/watch?v=' + params.node.data.videoId;
    const openInNewTab = () => window.open(url, '_blank');
    const customMenuItem = { name: 'Open in new tab', action: openInNewTab};
    return ['copy', 'copyWithHeaders', 'paste', customMenuItem];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
