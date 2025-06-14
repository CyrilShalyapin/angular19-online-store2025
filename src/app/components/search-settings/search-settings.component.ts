import { Component } from '@angular/core';
import { CategorySelectComponent } from './components/category-select/category-select.component';
import { SortMethodSelectComponent } from './components/sort-method-select/sort-method-select.component';
import { SearchInputComponent } from './components/search-input/search-input.component';

@Component({
  selector: 'app-search-settings',
  imports: [CategorySelectComponent, SortMethodSelectComponent, SearchInputComponent],
  templateUrl: './search-settings.component.html',
  styleUrl: './search-settings.component.css'
})
export class SearchSettingsComponent {

}
