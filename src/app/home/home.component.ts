import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  product: any[] = [];
  category: any[] = [];
  filteredProducts: any[] = [];
  selectedCategoryName: string | null = null;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.setCategory();
    this.setProducts();
  }

  setProducts(categoryName?: string) {
    if (categoryName) {
      this.apiService.getSpecific(categoryName).subscribe(
        (products) => {
          this.product = products;
          this.filterProducts();
          console.log('Productos:', this.product);
        },
        (error) => {
          console.error('Error al obtener productos por categoría:', error);
        }
      );
    } else {
      this.apiService.getProducts().subscribe(
        (products) => {
          this.product = products;
          this.filterProducts();
          console.log('Productos:', this.product);
        },
        (error) => {
          console.error('Error al obtener productos:', error);
        }
      );
    }
  }

  setCategory() {
    this.apiService.getCategory().subscribe(
      (category) => {
        this.category = category;
        console.log('Categorias:', this.category);
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  onCategoryChange(categoryName: string) {
    this.selectedCategoryName = categoryName;
    this.setProducts(categoryName);
  }

  filterProducts() {
    if (this.selectedCategoryName === null) {
      this.filteredProducts = this.product;
    } else {
      this.filteredProducts = this.product.filter((product) => product.categoryName === this.selectedCategoryName);
    }
  }

  toDetails(productId: number) {
    this.router.navigate(['details', productId]);
  }

  toCart() {
    this.router.navigate(['/cart']);
  }
}
