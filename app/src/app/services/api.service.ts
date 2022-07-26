import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders({
  'X-Requested-With': 'XMLHttpRequest',
  'Allow-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
});



@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private url = `https://api.cloudinary.com/v1_1/kozzuro/image/upload`;
  // private url = 'https://api.cloudinary.com/v1_1/cloudinary://978591967997766:EdaiHU9cNXb3JNbcoiG58fJpBEM@kozzuro/image/upload';

  postImage(image) {
    return this.http.post(this.url, image, {headers: headers});
  }
}
