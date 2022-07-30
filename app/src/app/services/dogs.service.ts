import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU5MTczMTEyLCJleHAiOjE2NTkyNTk1MTIsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.iz2IyDalaxPptOKQWy5goU-1-dwmKieg1zouhuJvJqe0OFsmcPCnLfcLViG5-rwnHgn74hjcm6wMyufvsu5RmQS91W4666gq3e6WOVZqrYVAIDQUpeZH4w8OJhaI6zskiiWWvjDGDefFd40BoSpmAVguNHFzoX_zTFUkt2Avqi26__SC8Uj6Q-s830_H-aiUZaAVkubOFV2G-b5ya0VujOOudGEFXEAepCCGst1ISJopnMc7xkGD9VGUIsEUHvGiPoQH8mZQQS1tGaLSs8UdZHJJdKzEtGz5V5zlCKmaqBdKg7-LKLtk0kUSmZ1U-NcfW5SG5vYU_EyL-k7MM77qeQ'
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

}
