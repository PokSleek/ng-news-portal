import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

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
  @Output() sourceChange: EventEmitter<string> = new EventEmitter();

  sources: Array<SourceModel>;
  selectedSource: string;
  text: string;



  constructor(
    private newsApiService: NewsApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sources = [];
    this.text = '';
    this.newsApiService.getSource()
      .then(sources => {
        this.sources = sources;
        this.selectedSource = sources[0].id;
      });
  }

  onSourceChange(): void {
    this.sourceChange.emit(this.selectedSource);
  }

  OnChanges(): void {
    console.log(this);
  }

  onFilterNews(): void {
    this.filterNewsChange.emit({q: this.text, sources: this.selectedSource});
  }

  onFilterNewsCreatedByMe(event: any): void {
    console.log(event.target.checked);
    this.filterCreatedByMeChange.emit(event.target.checked);
  }

  onGoToEdit(): void {
    this.router.navigate(['/edit']);
  }
}
