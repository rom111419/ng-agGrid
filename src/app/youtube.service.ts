import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IYoutubeItem, IYoutubeList } from 'src/app/youtube-item';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  configUrl = 'https://www.googleapis.com/youtube/v3/search?' +
    'key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk' +
    '&maxResults=50' +
    '&type=video' +
    '&part=snippet' +
    '&q=john';

  constructor(private http: HttpClient) { }

  getYoutubeList(): Observable<IYoutubeList> {
    return this.http.get<IYoutubeList>(this.configUrl);
  }
}
