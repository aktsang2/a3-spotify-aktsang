import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: false
})
export class SearchComponent {
  searchString: string = '';
  searchCategory: string = 'artist';
  searchCategories: string[] = ['artist', 'album', 'track'];
  results: ResourceData[] = [];

  constructor(private spotifyService: SpotifyService) {}

  doSearch() {
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {
      this.results = data;
    });
  }
}

