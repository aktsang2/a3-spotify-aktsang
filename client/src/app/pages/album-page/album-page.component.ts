import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css'],
  standalone: false
})
export class AlbumPageComponent implements OnInit {
  albumId: string;
  album: AlbumData;
  tracks: TrackData[];

  // ✅ Inject SpotifyService
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');

    // ✅ Fetch album details
    this.spotifyService.getAlbum(this.albumId).subscribe((data: any) => {
      this.album = new AlbumData(data);
    });

    // ✅ Fetch album tracks
    this.spotifyService.getAlbumTracks(this.albumId).subscribe((data: any) => {
      this.tracks = data.items.map((t: any) => new TrackData(t));
    });
  }
}
