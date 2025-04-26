import { Component, Input, OnInit } from '@angular/core';
import { CartItemService } from '../../Services/cart-item.service';
import { AuthService } from '../../Services/auth.service';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit, OnChanges {
  @Input() ProductId: string = '';
  cartItems: any[] = [];
  constructor(
    private _cartItemService: CartItemService,
    private _auth: AuthService
  ) {}
  ngOnInit(): void {
    this.getallCartItemsByUserId();
  }

  ngOnChanges() {
    console.log('ProductId changed:', this.ProductId);
    if (this.ProductId && this.ProductId !== '0') {
      this._cartItemService
        .addCartItem({
          productId: this.ProductId,
          quantity: 1,
          userId: this._auth.getuserId(),
        })
        .subscribe({
          next: (response) => {
            console.log('Item added successfully:', response);
            this.getallCartItemsByUserId();
          },
          error: (error) => {
            console.error('Error adding item:', error);
          },
        });
    }
  }

  // Increment item quantity
  incrementQuantity(item: any) {
    item.quantity++;

    this._cartItemService
      .updateCartItem({ id: item.id, quantity: item.quantity })
      .subscribe({
        next: (response) => {
          console.log('Item updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating item:', error);
        },
      });
  }

  // Decrement item quantity
  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this._cartItemService
        .updateCartItem({ id: item.id, quantity: item.quantity })
        .subscribe({
          next: (response) => {
            console.log('Item updated successfully:', response);
          },
          error: (error) => {
            console.error('Error updating item:', error);
          },
        });
    }
  }

  // Remove item from cart
  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);

    this._cartItemService.deleteCartItem(itemId.toString()).subscribe({
      next: (response) => {
        console.log('Item removed successfully:', response);
      },
      error: (error) => {
        console.error('Error removing item:', error);
      },
    });
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );
  }

  checkout() {
    console.log('Checkout clicked!');
  }

  getallCartItemsByUserId() {
    const userId = this._auth.getuserId();
    this._cartItemService.getAllCartItemsByUserId(userId).subscribe({
      next: (response) => {
        this.cartItems = response.data;
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }
}
