import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model'; // Create this model
import { ProductService } from '../services/product.service'; // Create this service
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []; // For search results
  errorMessage: string = '';
  searchTerm: string = ''; // For search input

  constructor(private productService: ProductService, private cartService: CartService) { } // Inject CartService

  addToCart(product: Product) {
    this.cartService.addToCart(product); // Call the addToCart method of the CartService
    alert(`${product.productName} added to cart!`); // Or a more user-friendly notification
  }
  
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products]; // Initialize filtered products
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error loading products:', error);
      }
    });
  }

  filterProducts() {
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    } else {
      this.filteredProducts = [...this.products]; // Reset to all products
    }
  }
}