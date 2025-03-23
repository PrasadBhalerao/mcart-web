// cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model'; // Import Product model
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]); // Use BehaviorSubject
  currentCart = this.cartItems.asObservable();

  constructor() { }

  addToCart(product: Product) {
    const currentItems = this.cartItems.value; // Get the current items
    const updatedItems = [...currentItems, product]; // Add the new product
    this.cartItems.next(updatedItems); // Update the cartItems BehaviorSubject
  }

  getCartItems(): Product[] {
    return this.cartItems.value;
  }

  clearCart() {
    this.cartItems.next([]);
  }
}