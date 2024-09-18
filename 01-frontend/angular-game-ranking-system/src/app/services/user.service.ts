import { Injectable } from '@angular/core';
import {User} from "../common/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs";
import {Role} from "../common/role";
import {Clan} from "../common/clan";
import {ClanRank} from "../common/clan-rank";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'http://localhost:8080/api/players';
  private baseUrl2 = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + '/' + id);
  }

  getOtherPlayer(currentUserId: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl2 + '/getOtherPlayer?currentUserId=' + currentUserId);
  }

  getRoleByUserId(id: number): Observable<Role> {
    return this.httpClient.get<Role>(this.baseUrl2 + '/getRoleByUserId?id=' + id);
  }

  getClanByUserId(id: number): Observable<Clan> {
    return this.httpClient.get<Clan>(this.baseUrl2 + '/getClanByUserId?id=' + id);
  }

  getClanRankByUserId(id: number): Observable<ClanRank> {
    return this.httpClient.get<ClanRank>(this.baseUrl2 + '/getClanRankByUserId?id=' + id);
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<GetResponseUsers>(this.baseUrl).pipe(
      map(response => response._embedded.players)
    )
  }

  getUserListTopTen(): Observable<User[]> {
    return this.httpClient.get<GetResponseUsers2>(this.baseUrl2 + '/getUsersTopTen')
      .pipe(map(response => response.content));
  }

  getUserListPaginate(thePage: number,
                      thePageSize: number): Observable<GetResponseUsers2> {
    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl2}?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseUsers2>(searchUrl);
  }

  getUserListByClanIdPaginate(clanId: number,
                      thePage: number,
                      thePageSize: number): Observable<GetResponseUsers2> {
    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl2}/getAllUsersByClanId?clanId=${clanId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseUsers2>(searchUrl);
  }

  getUserIdByEmailAndPassword(email: string,
                              password: string): Observable<number> {
    const searchUrl = `${this.baseUrl2}/getUserIdByEmailAndPassword?email=${email}&password=${password}`;

    return this.httpClient.get<number>(searchUrl);
  }

  checkUserByEmail(email: string) {
    const searchUrl = `${this.baseUrl2}/checkUserByEmail?email=${email}`;

    return this.httpClient.get<boolean>(searchUrl);
  }

  registerUser(user: User) {
    return this.httpClient.post<User>(this.baseUrl2, user);
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(this.baseUrl2, user);
  }

  leaveClan(user: User) {
    console.log(user);
    return this.httpClient.put<User>(this.baseUrl2 + '/leaveClan', user);
  }

  deleteUser(userId: number) {
    return this.httpClient.delete<String>(this.baseUrl + '/' + userId);
  }

  deleteUser2(userId: number) {
    return this.httpClient.delete<User>(this.baseUrl2 + '/' + userId);
  }

  joinClan(user: User) {
    const url = `${this.baseUrl2}/joinClan`;
    return this.httpClient.put<User>(url, user);
  }
}

interface GetResponseUsers {
  _embedded: {
    players: User[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseUsers2 {
  content: User[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
