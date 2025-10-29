import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
  standalone: false
})
export class ArtistPageComponent implements OnInit {
  artistId: string;
  artist: ArtistData;
  topTracks: TrackData[];
  albums: AlbumData[];

  // ✅ Inject SpotifyService
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');

    // ✅ Get artist details
    this.spotifyService.getArtist(this.artistId).subscribe((data: any) => {
      this.artist = new ArtistData(data);
    });

    // ✅ Get artist top tracks (Spotify requires a market parameter, e.g. 'US')
    this.spotifyService.getTopTracksForArtist(this.artistId, 'US').subscribe((data: any) => {
      this.topTracks = data.tracks.map((t: any) => new TrackData(t));
    });

    // ✅ Get artist albums
    this.spotifyService.getAlbumsForArtist(this.artistId).subscribe((data: any) => {
      this.albums = data.items.map((a: any) => new AlbumData(a));
    });
  }
}
