import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU4OTQzNTU4LCJleHAiOjE2NTkwMjk5NTgsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.RudZHCyf8-ABkoDT6k7IP-CEAniqyRteOZn2TFFlnbTIM-D0LccxOajQglku67gUNy1_moSq2_AGIPsT-QeDmiinwUIyjYSZfDM_zEuebi41uKok8X21VU0TYUSATK74_eRpde3Idnm98jpSrmsVnXs6TaAO87Bl1c0diY7-NXe-Hncc02I7I75W7DpGAD7a45ozSBBckYx28txtwzbxMZMi0cj4jUJOJzrkTQzRPGRRWFukzGnUvIPwwTAwVKH4jDmghQJSY_DLaoBbB4nUUR76Yb8UxVRELMC_OdQrTy0__PVWNDilhwu0zUMLRk75ha8MrcDXKllQsixCLCwxYA';
const API_URL = 'localhost:3000';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
});

@Injectable({
  providedIn: 'root',
})
export class DogsService {
  constructor(private http: HttpClient) {}

  private url = `http://${API_URL}/api/v1/dogs`;

  getDogs(): Observable<any> {
    return this.http.get(this.url, { headers: headers });
  }

  postDog(body) {
    return this.http.post(this.url, body, { headers: headers });
  }

}
