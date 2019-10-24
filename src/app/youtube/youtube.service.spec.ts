import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { YoutubeService } from 'src/app/youtube/youtube.service';

describe('YoutubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [YoutubeService]
  }));

  it('should be created', () => {
    const service: YoutubeService = TestBed.get(YoutubeService);
    expect(service).toBeTruthy();
  });

  it('should be link for API ', () => {
    const service: YoutubeService = TestBed.get(YoutubeService);
    expect(service.configUrl).toEqual('https://www.googleapis.com/youtube/v3/search?' +
        'key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john');
  });
});
