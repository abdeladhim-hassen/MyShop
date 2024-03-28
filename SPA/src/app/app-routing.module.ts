import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Route for the home page
  },
  {
    path: 'search/:searchText/page/:page', // Route for search results page
    component: HomeComponent,
  },
  {
    path: 'category/:categoryUrl', // Route for category page
    component: HomeComponent,
  },
  {
    path: 'product/:id', // Route for product details page
    component: ProductDetailsComponent,
  },
  {
    path: '**', // Wildcard route for any other routes not defined above
    component: NotFoundComponent, // Route for the 404 Not Found page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
