import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU5MDI2ODg3LCJleHAiOjE2NTkxMTMyODcsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.D4B2f1QxUdRiJakrRSU0y-WqkirHVLerLJfUqOn7vDXMQLUIs6DNhW2CvTLG8Clzq7oxsApjVkhZS2z5CuuIamjajJsMEf4huM5oYthbg6J6t6n945_VeynVta0LLqUth5InV515s7bZPRSQC5Zryp871-I1pDwFR5hwOQjkTKzQgXCe2bvEczg8zRAsLqW78rR7B0r576RZR1N42derEGI8-97PmprKQ28qvckwDqSXgiLWzZFtplRFkkwN6WRTZYeKHfVK1QuJgB6BlEnitgfhNEQh1XCsxtgzzrbUSeWBYS1U9tp02PQ8udeNHE_E8STfFcehSgDyzB_yxYbV-A';
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
