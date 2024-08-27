import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApiProducts = 'https://fakestoreapi.com/products';
  private urlApiCategory = 'https://fakestoreapi.com/products/categories';
  private urlApiSpecific = 'https://fakestoreapi.com/products/category/';
  private urlApiProductById = 'https://fakestoreapi.com/products/';

  private cart: any[] = [];
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get<any>(this.urlApiProducts);
  }

  public getCategory(): Observable<any> {
    return this.http.get<any>(this.urlApiCategory);
  }

  public getSpecific(categoryName: string): Observable<any> {
    return this.http.get<any>(`${this.urlApiSpecific}${categoryName}`);
  }

  public getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApiProductById}${id}`);
  }

  public addToCart(product: any) {
    const existingProduct = this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }
    this.cartSubject.next(this.cart);
  }

  public getCart(): Observable<any[]> {
    return this.cartSubject.asObservable(); 
  }

  public getTotalItems(): number {
    return this.cart.reduce((total, product) => total + product.quantity, 0);
  }

  public clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
}
