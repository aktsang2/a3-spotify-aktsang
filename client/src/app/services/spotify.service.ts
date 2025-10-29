import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  expressBaseUrl: string = 'https://localhost:8888';

  constructor(private http: HttpClient) {}

  private sendRequestToExpress(endpoint: string): Promise<any> {
    const uri: string = `${this.expressBaseUrl}${endpoint}`;
    return firstValueFrom(this.http.get(uri)).then(
      (response) => response,
      (err) => err
    );
  }

  aboutMe(): Promise<ProfileData> {
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    const encoded = encodeURIComponent(resource);
    return this.sendRequestToExpress(`/search/${category}/${encoded}`).then((data) => {
      if (category === 'artist') {
        return data.artists.items.map((a: any) => new ArtistData(a));
      } else if (category === 'album') {
        return data.albums.items.map((a: any) => new AlbumData(a));
      } else if (category === 'track') {
        return data.tracks.items.map((t: any) => new TrackData(t));
      }
      return [];
    });
  }

  getArtist(artistId: string): Promise<ArtistData> {
    const encoded = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist/${encoded}`).then((data) => {
      return new ArtistData(data);
    });
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    const encoded = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist/${encoded}/top-tracks`).then((data) => {
      return data.tracks.map((t: any) => new TrackData(t));
    });
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    const encoded = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist/${encoded}/albums`).then((data) => {
      return data.items.map((a: any) => new AlbumData(a));
    });
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    const encoded = encodeURIComponent(albumId);
    return this.sendRequestToExpress(`/album/${encoded}`).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    const encoded = encodeURIComponent(albumId);
    return this.sendRequestToExpress(`/album/${encoded}/tracks`).then((data) => {
      return data.items.map((t: any) => new TrackData(t));
    });
  }

  getTrack(trackId: string): Promise<TrackData> {
    const encoded = encodeURIComponent(trackId);
    return this.sendRequestToExpress(`/track/${encoded}`).then((data) => {
      return new TrackData(data);
    });
  }
}
