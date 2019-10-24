import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckboxAllComponent } from 'src/app/youtube/checkbox-all/checkbox-all.component';
import { ImageComponent } from 'src/app/youtube/image/image.component';
import { TitleComponent } from 'src/app/youtube/title/title.component';
import { YoutubeService } from 'src/app/youtube/youtube.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  columnDefs = [];
  frameworkComponents;
  youtubeItemSnippets = [];
  youtubeCheckboxedItemsNumber = 0;
  subscription: Subscription = new Subscription();
  private defaultColDef;
  private gridApi;
  private gridColumnApi;
  protected popupParent;

  constructor(private http: HttpClient,
              private youtubeService: YoutubeService,
              public cd: ChangeDetectorRef
  ) {
    this.popupParent = document.querySelector('body');
    this.columnDefs = [
      {
        headerName: '',
        field: 'checkboxes',
        checkboxSelection: true,
        width: 80
      },
      {headerName: '', field: 'thumbnails', cellRendererFramework: ImageComponent},
      {headerName: 'Published on', field: 'publishedAt'},
      {headerName: 'Video Title', field: 'title', cellRendererFramework: TitleComponent},
      {headerName: 'Description', field: 'description'}
    ];

    this.frameworkComponents = {agColumnHeader: CheckboxAllComponent};
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

  onSelectionModeChanged() {
    this.gridColumnApi.setColumnVisible('checkboxes', (!this.gridColumnApi.getColumn('checkboxes').visible));
  }

  getContextMenuItems(params) {
    const url = 'https://www.youtube.com/watch?v=' + params.node.data.videoId;
    const openInNewTab = () => window.open(url, '_blank');
    return ['copy', 'copyWithHeaders', 'paste', {name: 'Open in new tab', action: openInNewTab}];
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
