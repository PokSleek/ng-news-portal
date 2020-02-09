import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { MainComponent } from './components/organisms/main/main.component';
import { NavigationComponent } from './components/molecules/navigation/navigation.component';
import { FilterPanelComponent } from './components/molecules/filter-panel/filter-panel.component';
import { ArticlesListComponent } from './components/molecules/articles-list/articles-list.component';
import { ArticleComponent } from './components/molecules/article/article.component';
import { ShortenedArticleComponent } from './components/molecules/shortened-article/shortened-article.component';
import { ArticleFormComponent } from './components/molecules/article-form/article-form.component';
import { LoginFormComponent } from './components/organisms/login-form/login-form.component';
import { NewsApiService } from './services/news-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    NavigationComponent,
    FilterPanelComponent,
    ArticlesListComponent,
    ArticleComponent,
    ShortenedArticleComponent,
    ArticleFormComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NewsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
