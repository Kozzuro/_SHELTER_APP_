import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';

const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNrX3puYnNQdVFsT2xNT2hrRFBGcCJ9.eyJpc3MiOiJodHRwczovL2Rldi03ZmNmMy1pOS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGVhT21nM1l6c3dKNnVTSWNhOVVkVlJFWm9LQVh1M0hAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTdmY2YzLWk5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU4MjUzMTQ1LCJleHAiOjE2NTgzMzk1NDUsImF6cCI6IkxlYU9tZzNZenN3SjZ1U0ljYTlVZFZSRVpvS0FYdTNIIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.hEJPbLRVsFo98Gx-TnzO4Jik121QQMoGfYutxh8lm1q_7V4wYe5F6yY4mQ08QB-_3EyDwwUwE4x5Dkgj88-q7mfU-yL3y1jWGMSkxQBtqaL06iYR4WQVSoWw2AUDzWgrow7GqERRKubLqWZ2hu6ymEXRTivv1Gnd3LDa5PEPDMdMS4152wDK_AaUbDz5cQBnJFV6FrFFjgn9pntxqQ72vXodcbUXfs50UNAgsyG20pHEI29SPXX6bP5kKiQ9z3SIFvZiayDxJOj4t3uP4jzg5BkM8cngDa_v1pec-HFJY4mZ59YmcJFe5_iZRf7JiqBoD6sHkS2qpH3PMwrRCSHr1A';
const API_URL = 'localhost:3000';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`
});

export interface DogModel{
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private url = `http://${API_URL}/api/v1/dogs`;

  getDogs(): Observable<DogModel>{
    return this.httpClient.get<DogModel>(this.url, { headers: headers });
  }
  
}
