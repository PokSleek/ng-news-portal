import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesListComponent } from './components/molecules/articles-list/articles-list.component';
import { ArticleComponent } from './components/molecules/article/article.component';
import { LoginFormComponent } from './components/organisms/login-form/login-form.component';
import { ArticleFormComponent } from './components/molecules/article-form/article-form.component';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticlesListComponent
  },
  {
    path: 'article/:id',
    component: ArticleComponent
  },
  {
    path: 'edit/:id',
    component: ArticleFormComponent,
  },
  {
    path: 'edit',
    component: ArticleFormComponent,
  },
  {
    path: 'create',
    component: ArticleFormComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
