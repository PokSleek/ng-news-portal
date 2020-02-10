import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NewsApiService } from 'src/app/services/news-api.service';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { ArticleModel } from 'src/app/models';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  public articleId: string;
  public article: ArticleModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public newsApiService: NewsApiService,
    public authService: AuthorisationService
  ) {
    this.article = {
      source: {
        id: '',
        name: ''
      },
      author: this.authService.user,
      title: ' ',
      description: ' ',
      url: ' ',
      urlToImage: ' ',
      publishedAt: new Date(Date.now()).toISOString(),
      content: ' ',
    };
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.articleId = params.get('id');
      console.log(this.articleId);
  });
    console.log(this.articleId);
    if (this.articleId) {
      this.newsApiService.getArticleById(this.articleId)
        .then(article => this.article = article)
    }
  }

  onSave(): void {
    if (this.articleId) {
      this.article.source.name = this.article.source.id;
      const {_id, __v, ...article } = this.article;
      this.newsApiService.updateArticleById(this.articleId, article)
        .then((() => this.router.navigate(['/articles'])));
    } else {
      this.newsApiService.saveArticle(this.article)
      .then((() => this.router.navigate(['/articles'])));
    }

  }

  onCancel(): void {
    console.log('Canceled');
    this.router.navigate(['/articles']);
  }

}
