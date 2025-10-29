import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SpotifyService],
    standalone: false
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    if (!this.searchString) return;
      
      this.spotifyService.search(this.searchCategory, this.searchString).subscribe((data: any) => {
      if (this.searchCategory === 'artist') {
        this.resources = data.artists.items.map((item: any) => new ArtistData(item));
      } else if (this.searchCategory === 'album') {
        this.resources = data.albums.items.map((item: any) => new AlbumData(item));
      } else if (this.searchCategory === 'track') {
        this.resources = data.tracks.items.map((item: any) => new TrackData(item));
     }
  });
 }
}
