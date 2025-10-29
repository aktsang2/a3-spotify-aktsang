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
  @Input() popularity: number;

  constructor() {}

  ngOnInit() {}

  getPopularityColor(value: number): string {
    if (value >= 75) return 'green';
    if (value >= 40) return 'orange';
    return 'red';
  }
}

