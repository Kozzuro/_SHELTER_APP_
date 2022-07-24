import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU4NjUyOTkyLCJleHAiOjE2NTg3MzkzOTIsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.bBV2oyaduFCmo9f6AoTGYhBpyU83DsTy4D1VByQMbz0MXxxWZ7Vf8yvnPgY31RWvrOjnxxIZJFdbSlVR4MrbRRKanyF9gQvDPP3fX6-xyTwoh4Q2ybwIYZA3aSS0rQps1XtiuW6BscUJQC_y9BuidGIvchR2i2I-M0K7psOxYZ_iM02GoDjO0SlpeckUOOxZ--xtg0XfUxXLEAGRi8yAhCh8CansgJEuPC4pfJ8xGVf6FipcAyLgQN9Lkb43HtHLU3xh4DF2yu1xSYiD1ArM3xVR95C4IrTaJNbRmVNwdZWoEuBd1svTkxzJZhJFtJ0LTf1skgE-0IQsLKkHZ6dewA';
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
