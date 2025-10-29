export class ProfileData {
  name: string;
  imageURL: string;
  spotifyProfile: string;

  constructor(data: any) {
    this.name = data.display_name;
    this.imageURL = data.images?.[0]?.url || 'assets/unknown.jpg';
    this.spotifyProfile = data.external_urls?.spotify;
  }
}

