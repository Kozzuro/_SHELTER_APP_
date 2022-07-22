import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU4NTE5MDQ1LCJleHAiOjE2NTg2MDU0NDUsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.E0WzBnDez_bsDec5BV4m6l_wWYquzWthygEDrSfjG-3Gwehv_AuLUDddW8RPyuQixSbkGkZfAkxBOlOF9b7d2lbt7i8cHEs4aazt5KzBTdwdwIejrXSlLvaUNJ0qOoR6pMUYpjidF2OxsaMwBDywOFeMZts5vaz7l8N9hJTV43013LYDer73Rflpy4bqp33hcNopGZfeJyVgOM4NCRVl8qCMCDff-VlRbJiN5T0oWcWvWClhxZUMCmE135e7Y83HPkVhorq8JaDoP5zHKNHs6pOVsGo8SY9BZhBr3LcHOY2eJpZFZ8iOUOwLOhYPt_JMHaiM29dWvQlkc82rpH_2yg';
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
