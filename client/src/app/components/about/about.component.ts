import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ProfileData } from '../../data/profile-data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent implements OnInit {
  user: ProfileData | null = null;   // ✅ add this

  constructor(private spotify: SpotifyService) {}

  ngOnInit() {}
  
  loadUserInfo() {
    this.spotify.aboutMe().then((me: ProfileData) => {
      this.user = me;
    });
  }
}
