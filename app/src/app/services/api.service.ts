import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU4MzM5MTUyLCJleHAiOjE2NTg0MjU1NTIsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.ei7s6tp00OhqD7dfyliEyKGQdC8t8qIggV1T_UVfIBhVvHZ8tNja99sXUXdgHPv04LUncGw4ZR_pE79rMxqxYtpda9hx8lbxIfcspUTziF1okqXL5Q50A_Hgdyn1baCSJP8tMlVvkUsDL-edxzbujTtpUGh6a0BsEzfdBMRJzrXD7EtqePJcFZsCP-aPMC8bODDfRTljkFDlAKg41nzgzkPiY75gxUEqTzFS7yZjb-DhH8ybZh5j11dgGIPuiSvgCwgxo4sxshYzxCdyyXfbufKZ46-DgFqBT9CSRjL_mpFpOn1xaOkHIWB9vmeXQevPw1dZR1z-p5snrXopTYF8_Q';
const API_URL = 'localhost:3000';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
});

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private url = `http://${API_URL}/api/v1/dogs`;

  getDogs(): Observable<any> {
    return this.http.get(this.url, { headers: headers });
  }

}
