import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() sidebar = false;
  searchText: string = "Search...";
  suggestions: string[] = [];
  selectedIndex: number = -1; // Index of the selected suggestion
  @ViewChild('searchInput') searchInputRef!: ElementRef;

  constructor(private productService: ProductService, private router: Router) {}

  onSearchChange(event: Event){
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.searchText = value;
      this.selectedIndex = -1; // Reset selectedIndex when search text changes
      this.productService.getProductSearchSuggestions(this.searchText)
        .subscribe(result => {
          if (result && result.data) {
            this.suggestions = result.data;
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
  }

  navigateToSearch(searchText: string) {
    if(searchText  != null && searchText.trim().length  >0){
      this.router.navigateByUrl(`/search/${searchText}/page/1`);
    }

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
    // Clear suggestions when input loses focus
    this.suggestions = [];
  }
}
