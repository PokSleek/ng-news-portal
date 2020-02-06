import {Component, OnInit, OnChanges, Output, EventEmitter, Input} from '@angular/core';

import { NewsApiService } from '../../../services/news-api.service';
import { Router } from '@angular/router';

import { SourceModel } from '../../../models';
import { FilterParams } from '../../../interfaces';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  providers: [NewsApiService]
})
export class FilterPanelComponent implements OnInit {
  @Output() filterNewsChange: EventEmitter<FilterParams> = new EventEmitter();
  @Output() filterCreatedByMeChange: EventEmitter<boolean> = new EventEmitter();
  @Output() headerChange: EventEmitter<string> = new EventEmitter();

  private sources: Array<SourceModel>;
  private selectedSource: string;
  private readonly queryFilter: string;
  private isCreatedByMeFilter: boolean;

  constructor(
    private newsApiService: NewsApiService,
    private router: Router,
  ) {
    // this.selectedSource = '';
    this.sources = [];
    this.queryFilter = '';
    this.isCreatedByMeFilter = false;
  }


  ngOnInit(): void {
    // this.newsApiService.getSource()
    //   .then(sources => {
    //     this.sources = sources;
    //     // this.onSourceChange(sources[0].id);
    //   });
  }

  onSourceChange(source: string): void {
    this.selectedSource = source;
    this.headerChange.emit(source);
  }

  onQueryFilter(): void {
    console.log({ q: this.queryFilter, sources: this.selectedSource });
    this.filterNewsChange.emit({ q: this.queryFilter, sources: this.selectedSource });
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
