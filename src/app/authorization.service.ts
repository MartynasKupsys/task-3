import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const USERNAME = "admin";
const PASSWORD = "admin";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private token: string | null = null;

  constructor(private httpClient: HttpClient) { }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  getHeaderValue(): string {
    return `Bearer ${this.token}`;
  }

  login(username: string = USERNAME, password: string = PASSWORD): Observable<boolean> {
    return this.httpClient.post('https://demo.credoid.com/api/login', { username: username, password: password }, { observe: 'response' }).pipe(map(result => {
      this.token = (<any>result.body).access_token as string;
      return (<any>result).status == 200;
    }))
  }


}
