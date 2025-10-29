import { Component, Input } from '@angular/core';
import { AlbumData } from '../../data/album-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css'],
  standalone: false
})
export class CarouselCardComponent {
  @Input() album: AlbumData;   // ✅ declare album
}
