import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { UserType } from '../../models/user';
// bejelentkezéshez autentikáció 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = API_URL;

  constructor(private http: HttpClient) { }
// metóduson belül van az url-hez hozzáfűzve a login és ez lesz az elérési út a backenden.
  login(user: any): Observable<UserType>{
    return this.http.post<UserType>(this.url + '/authentication',user);
  }
}
