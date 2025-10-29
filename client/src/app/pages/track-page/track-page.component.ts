import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackData } from '../../data/track-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css'],
  standalone: false
})
export class TrackPageComponent implements OnInit {
  trackId: string;
  track: TrackData;

  // ✅ Inject SpotifyService
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');

    // ✅ Fetch track details
    this.spotifyService.getTrack(this.trackId).then((data) => {
      this.track = data;
    });
  }
}
