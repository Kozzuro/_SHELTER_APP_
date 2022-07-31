import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

const TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU5MjU5Nzg0LCJleHAiOjE2NTkzNDYxODQsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.kNUo9oiv2V3f3rg7cF5xBsiL98flOSX-KKBcTfsXbTXX7B5z9eJ8qJ6xi_yDa6s8vydP94OA2WVvHgQCF1nfDM3I_u6rhvTOePfhSe_iCGXvI2BqvYAanxWsbxZfrUBZc_hdUDlvBl5qOOzU6LPppf0huwkL_00JeS5B947AYHuj0GID93PN1BL3_IoguNv8FEDok2WxdrBiofwDpL4mNn9yp9mVX_wa2Bnl8cYorgLnMigugr1uiecXooWt-Jca-kFduEg6vOy5cHop3Z9lh30cQsU7-0DKRB9IZtfNS_wJAtHwi9SuBs1vF_77be4W4G9iK2vAEbwjHqi3CuQhfw'
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
