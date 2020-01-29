import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerInfo: string;
  username: string;

  constructor() {
    this.username = 'User';
    this.headerInfo = 'Source';
  }

  ngOnInit() {
  }

}
