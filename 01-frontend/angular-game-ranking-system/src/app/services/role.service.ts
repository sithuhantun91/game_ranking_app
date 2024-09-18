import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../common/user";
import {Role} from "../common/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8080/api/roles';

  constructor(private httpClient: HttpClient) {
  }

  getRole(id: number): Observable<Role> {
    return this.httpClient.get<Role>(this.baseUrl + '/' + id);
  }

  getRoleList(): Observable<Role[]> {
    return this.httpClient.get<GetResponseRoles>(this.baseUrl).pipe(
      map(response => response._embedded.roles)
    );
  }
}

interface GetResponseRoles {
  _embedded: {
    roles: Role[];
  }
}
