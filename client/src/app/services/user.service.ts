import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, environment } from 'src/environments/environment';
import { UserType } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = API_URL;

  constructor(private http: HttpClient) {
    this.url += "/users" ;
   }

  getAll(): Observable<UserType[]>{
    return this.http.get(this.url) as Observable<UserType[]>;
  }

  getById(id: number): Observable<UserType[]>{
    return this.http.get(`${this.url}/${id}`) as Observable<UserType[]>;
  }

  post(user: UserType): Observable<UserType> {
    return this.http.post<UserType>(this.url,user) as Observable<UserType>;
  }

  put(user: UserType): Observable<UserType>{
    return this.http.put<UserType>(this.url, user);
  }
}
