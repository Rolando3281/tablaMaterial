import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<any>(`http://192.168.1.17:8080/api/productos`);
  }

  getCategorys(){
    return this.http.get(`http://192.168.1.17:8080/api/tiposProductos`);
  }

  addProduct(data: object){
    return this.http.post<any>('http://192.168.1.17:8080/api/productos', data);
  }

  getProduct(){
    return this.http.get<any>('http://192.168.1.17:8080/api/productos');
  }

  editProduct(data: object, id: number){
    const res = {id, ... data}
    console.log(data);
    console.log(res);
    return this.http.put<any>(`http://192.168.1.17:8080/api/productos/${id}`, res);
  }

  deleteProduct(id: number){
    return this.http.delete<any>(`http://192.168.1.17:8080/api/productos/${id}`);
  }



}
