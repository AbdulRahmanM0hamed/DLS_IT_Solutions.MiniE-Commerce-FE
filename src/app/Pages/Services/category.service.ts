import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddCategoryDto } from '../Interfaces/AddCategoryDto';
import { UpdateCategoryDto } from '../Interfaces/UpdateCategoryDto';
import { BaseSpecificationParams } from '../Interfaces/BaseSpecificationParams';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 private apiUrl = environment.apiUrl+'/api/Category'; 
 constructor(private _http: HttpClient) {}


 getAllCategories(params: BaseSpecificationParams): Observable<any> {
  const httpParams = new HttpParams()
    .set('pageIndex', params.pageIndex.toString())
    .set('pageSize', params.pageSize.toString());

  return this._http.get(`${this.apiUrl}/Get-All-Categories`, { params: httpParams });
}

getCategoryById(id: string): Observable<any> {
  return this._http.get(`${this.apiUrl}/Get-Category-By-Id/${id}`);
}

addCategory(dto: AddCategoryDto): Observable<any> {
  return this._http.post(`${this.apiUrl}/Add-Category`, dto);
}

updateCategory(dto: UpdateCategoryDto): Observable<any> {
  return this._http.put(`${this.apiUrl}/Update-Category`, dto);
}

deleteCategory(id: string): Observable<any> {
  return this._http.delete(`${this.apiUrl}/Delete-Category/${id}`);
}
}
