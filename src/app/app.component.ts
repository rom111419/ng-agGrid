import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient,
              private youtubeService: YoutubeService,
              public cd: ChangeDetectorRef
              ) {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
