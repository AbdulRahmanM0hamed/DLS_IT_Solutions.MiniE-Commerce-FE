import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UpdateProductsDto } from '../Interfaces/UpdateProductsDto';
import { AddProductDto } from '../Interfaces/AddProductsDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private apiUrl = environment.apiUrl+'/api/Product'; 
  constructor(private _http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._http.get(`${this.apiUrl}/Get-All-Products`);
  }

  getProductById(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/Get-Product-By-Id/${id}`);
  }

  getProductsByCategoryId(categoryId: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/Get-All-Products-By-Category-Id/${categoryId}`);
  }

  createProduct(credentials:{name: string; description: string; price: number; stock: number; categoryId: string;}): Observable<any> {
    return this._http.post(`${this.apiUrl}/Create-Product`, credentials);
  }

  updateProduct(credentials:{id:string,name: string; description: string; price: number; stock: number; categoryId: string;}): Observable<any> {
    return this._http.put(`${this.apiUrl}/Update-Product`, credentials);
  }

  deleteProduct(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/Delete-Product?id=${id}`);
  }
}
