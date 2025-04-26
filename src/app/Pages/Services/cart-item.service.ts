import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddCartItemDto } from '../Interfaces/AddCartItemDto';
import { UpdateCartItemDto } from '../Interfaces/UpdateCartItemDto';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
 private apiUrl = environment.apiUrl+'/api/CartItem';
 constructor(private _http: HttpClient) {}


//  updateCartItemById:BehaviorSubject<any> = new BehaviorSubject<any>(null);

 getAllCartItemsByUserId(userId: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/Get-All-CartItems-By-user-Id?userId=${userId}`);
  }

  getCartItemById(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/Get-CartItem-By-Id/${id}`);
  }

  addCartItem(credentials:{ productId: string; quantity: number;  userId: string;}): Observable<any> {
    return this._http.post(`${this.apiUrl}/Add-CartItem`, credentials);
  }  

  updateCartItem(credentials:{id:string ,quantity:number}): Observable<any> {
    return this._http.put(`${this.apiUrl}/Update-CartItem`, credentials);
  }

  deleteCartItem(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/Delete-CartItem?id=${id}`);
  }
}
