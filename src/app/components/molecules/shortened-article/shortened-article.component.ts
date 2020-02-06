import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortened-article',
  templateUrl: './shortened-article.component.html',
  styleUrls: ['./shortened-article.component.scss']
})
export class ShortenedArticleComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectToArticle(): void {
    this.router.navigate(['/article/123']);
  }

  onDelete(): void {
    console.log('Deleted');
  }

  onEdit(): void {
    console.log('Edited');
    this.router.navigate(['/edit/123']);
  }

}
