import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() results: boolean[] = [];

  get trueCount(): number {
    return this.results.filter(result => result === true).length;
  }

  constructor() {}

  ngOnInit(): void {}
}