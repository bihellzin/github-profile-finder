import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser (username: string) {
    return this.httpClient.get<any>(`https://api.github.com/users/${username}`);
  }
}
