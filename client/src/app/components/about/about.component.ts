import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent implements OnInit {
  name: string = null;
  profile_pic: string = 'assets/unknown.jpg';
  profile_link: string = null;

  // ✅ Inject the Spotify service
  constructor(private spotify: SpotifyService) {}

  ngOnInit() {}

  // ✅ Called when the button is clicked
  loadUserInfo() {
    this.spotify.getMe().subscribe((me: any) => {
      this.name = me.display_name;
      this.profile_pic = me.images?.length ? me.images[0].url : 'assets/unknown.jpg';
      this.profile_link = me.external_urls?.spotify;
    });
  }
}

