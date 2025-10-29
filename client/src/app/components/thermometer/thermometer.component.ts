import { Component, OnInit, Input } from '@angular/core';
import { Popularity } from 'src/app/data/popularity';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css'],
  standalone: false
})
export class ThermometerComponent implements OnInit {
  // ✅ Accept a Popularity object or just the numeric value
  @Input() popularity: Popularity | number;

  constructor() {}

  ngOnInit() {}

  // Helper to normalize to a number
  get value(): number {
    return typeof this.popularity === 'number'
      ? this.popularity
      : this.popularity?.value ?? 0;
  }

  // Helper to choose a color based on the value
  get color(): string {
    if (this.value >= 75) return 'green';
    if (this.value >= 40) return 'orange';
    return 'red';
  }
}

