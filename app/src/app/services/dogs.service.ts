import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU5MzczODQ3LCJleHAiOjE2NTk0NjAyNDcsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.GRdSpwpR49EcBqBSyQtqZ6Nldk91wzBOT5j4GpeiK8DQNV3ShY7fx-usoZIamwBgMG8PlpdcxodpYSoIN-CHUnPbwoRrXn8L5rjaQbXa5JP1bPm_d3tS1uDodk38xepM-MkdZN2xqHL57n4cEhhFFPm_jXZvYLwFrD1Aq5avSjy1gXzkDS7BqFV1koASz12A3cUm6PqXkLdPPDWcDKMabi1XQW72FFKArAXLGcvRE19s-Yce0qb0tcFiLBdxGopdFuY8jaBrihDJNNwxc6srxqglR4RTiGgSMsXqNcLelhdym5rhysjotA3OtLL0EgFmClAHDOSW7Bh-o-huXVdJOA'
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

  getDogsPagination(PAGE, LIMIT): Observable<any> {
    return this.http.get(`http://${API_URL}/api/v1/dogs/${PAGE}/${LIMIT}`, { headers: headers });
  }

  getDog(ID): Observable<any>{
    return this.http.get(`http://${API_URL}/api/v1/dogs/${ID}`, { headers: headers });
  }

  postDog(body) {
    return this.http.post(this.url, body, { headers: headers });
  }
  
  updateDog(ID, body) {
    return this.http.patch(`http://${API_URL}/api/v1/dogs/${ID}`, body, { headers: headers });
  }

  deleteDog(ID) {
    return this.http.delete(`http://${API_URL}/api/v1/dogs/${ID}`, { headers: headers });
  }

}
