import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() sidebar = false;
  searchText: string = "";
  suggestions: string[] = [];
  selectedIndex: number = -1; // Index of the selected suggestion
  @ViewChild('searchInput') searchInputRef!: ElementRef;

  constructor(private productService: ProductService, private router: Router) {}

  onSearchChange(event: Event){
    const value = (event.target as HTMLInputElement).value;
    if (value.trim()) {
      this.searchText = value;
      this.selectedIndex = -1; // Reset selectedIndex when search text changes
      this.getSuggestions(value).subscribe(result => {
        if (result) {
          this.suggestions = result;
          if (this.suggestions.length > 0) {
            this.selectedIndex = 0; // Select the first suggestion by default
          }
        }
      });
    } else {
      this.suggestions = [];
      this.selectedIndex = -1;
    }
  }

  selectSuggestion(suggestion: string) {
    this.searchText = suggestion;
    this.selectedIndex = -1;
    this.searchInputRef.nativeElement.focus();
    this.suggestions = [];
    this.navigateToSearch(suggestion);
  }

  navigateToSearch(searchText: string) {
    if(searchText.trim().length > 0){
      this.router.navigateByUrl(`/search/${searchText.trim()}/page/1`);
    }
  }

  getSuggestions(value: string): Observable<string[]> {
    return this.productService.getProductSearchSuggestions(value).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(suggestions => {
        if (suggestions && suggestions.data) {
          return of(suggestions.data);
        } else {
          return of([]);
        }
      })
    );
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.suggestions.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (this.selectedIndex === -1) {
        this.selectedIndex = this.suggestions.length - 1; // Select the last suggestion if none is selected
      } else {
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
      }
    } else if (event.key === "Enter" && this.selectedIndex !== -1) {
      event.preventDefault();
      this.selectSuggestion(this.suggestions[this.selectedIndex]);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.suggestions = [];
    }, 200);
  }
}
