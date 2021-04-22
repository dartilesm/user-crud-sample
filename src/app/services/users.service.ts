import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  create(user: User): Promise<User> {
    return this.http.post<User>(`${this.apiURL}/users`, user).toPromise();
  }

  findAll(): Promise<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users`).toPromise();
  }

  findOne(id: number): Promise<User> {
    return this.http.get<User>(`${this.apiURL}/users/${id}`).toPromise();
  }

  async update(id: number, user: User): Promise<User> {
    return this.http.patch<User>(`${this.apiURL}/users/${id}`, user).toPromise();
  }

  async remove(id: number): Promise<void> {
    return this.http.delete<void>(`${this.apiURL}/users/${id}`).toPromise();
  }
}
