import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU5MDM3NzI1LCJleHAiOjE2NTkxMjQxMjUsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.n6hgNjp9oJ2GOaspC3BcYye0t4vu-Bc7oDNMLphnMUjmh_M-YoE-8cpen7w-CWJfbRQnK1y9Ov58XWjlPsyfSgSE4bUn5hp9SLY8xmCDKz6w6RnA4mQ2SiYs1pfupxDABOWIiReqtyUNbDEep7l9FLjux-8AUP_e2pomxDucbZm6A3lP6-H7e9Bta1HE3nMLcSOaX5EWcO0PWpgZOxpT5LwJp6ms4P3qbFYVNZZdN13lYQuhOA2bPCsn0TiauwJ7be3LskTs-C_o9QwqmUmtmt1xD08HgipulRCNrhl-_F6Dg_7cMEHTv9XI_V-ESaKNF3sY84EfgR7DDG5qJUdNkg';
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
  // private paginationURL = `http://${API_URL}/api/v1/dogs/${PAGE}/${LIMIT}`;

  getDogs(): Observable<any> {
    return this.http.get(this.url, { headers: headers });
  }

  getDogsPagination(PAGE, LIMIT): Observable<any> {
    return this.http.get(`http://${API_URL}/api/v1/dogs/${PAGE}/${LIMIT}`, { headers: headers });
  }

  getDog(ID): Observable<any>{
    return this.http.get(`http://${API_URL}/api/v1/dogs/${ID}`, { headers: headers });
  }

  postDog(body) {
    return this.http.post(this.url, body, { headers: headers });
  }

}
