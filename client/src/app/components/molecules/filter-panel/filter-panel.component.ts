import {Component, OnInit, OnChanges, Output, EventEmitter, Input} from '@angular/core';

import { NewsApiService } from '../../../services/news-api.service';
import { Router } from '@angular/router';

import { SourceModel } from '../../../models';
import { FilterParams } from '../../../interfaces';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent implements OnInit {
  @Output() filterNewsChange: EventEmitter<FilterParams> = new EventEmitter();
  @Output() filterCreatedByMeChange: EventEmitter<boolean> = new EventEmitter();
  @Output() headerChange: EventEmitter<string> = new EventEmitter();

  private selectedSource: string;
  private queryFilter: string;

  public isCreatedByMeFilter: boolean;

  constructor(
    private newsApiService: NewsApiService,
    private router: Router,
  ) {
    this.selectedSource = 'abc-news';
    this.queryFilter = '';
    this.isCreatedByMeFilter = false;
  }


  ngOnInit(): void {
    this.newsApiService.fetchSource()
      .then(sources => {
        this.selectedSource = sources[0].id;
        this.headerChange.emit(this.selectedSource);
      });
  }

  onSourceChange(source: string): void {
    this.queryFilter = '';
    this.newsApiService.fetchArticles({ sources: this.selectedSource });
    this.selectedSource = source;
    this.headerChange.emit(source);
  }

  onQueryFilter(): void {
    this.newsApiService.fetchArticles({ q: this.queryFilter, sources: this.selectedSource });
  }

  onCreatedByMeFilter($event: any): void {
    const { checked } = $event.target;
    this.isCreatedByMeFilter = checked;

    if (checked) {
      this.headerChange.emit('Created by me');
    } else {
      this.headerChange.emit(this.selectedSource);
    }
  }

  onGoToCreate(): void {
    this.router.navigate(['/create']);
  }
}
