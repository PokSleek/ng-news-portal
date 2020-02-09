import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSave(): void {
    console.log('Saved');
    this.router.navigate(['/articles']);
  }

  onCancel(): void {
    console.log('Canceled');
    this.router.navigate(['/articles']);
  }

}
