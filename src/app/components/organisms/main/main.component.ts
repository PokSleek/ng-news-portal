import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  headerInfo: string;

  constructor() {
    this.headerInfo = 'abc-news';
  }

  ngOnInit() {
  }

  onSourceChange(newSource: string) {
    this.headerInfo = newSource;
  }
}
