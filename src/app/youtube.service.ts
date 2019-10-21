import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getListVideo() {
    return this.http.get(this.configUrl);
  }
}
