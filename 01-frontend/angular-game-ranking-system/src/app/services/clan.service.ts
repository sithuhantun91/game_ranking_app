import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/user";
import {Clan} from "../common/clan";
import {map, Observable} from "rxjs";
import {TopTenClan} from "../common/top-ten-clan";

@Injectable({
  providedIn: 'root'
})
export class ClanService {
  private baseUrl = 'http://localhost:8080/api/clans';
  private baseUrl2 = 'http://localhost:8080/api2/clans';

  constructor(private httpClient: HttpClient) { }

  getClan(id: number):Observable<Clan> {
    return this.httpClient.get<Clan>(this.baseUrl + '/' + id);
  }

  getClanListTopTen() {
    return this.httpClient.get<TopTenClan[]>(this.baseUrl2 + '/getClansTopTen');
  }

  checkClanName(clanName: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl2 + '/' + clanName);
  }

  registerClan(clan: Clan) {
    return this.httpClient.post<Clan>(this.baseUrl, clan);
  }

  getClanListPaginate(searchValue: string,
                      thePage: number,
                      thePageSize: number): Observable<GetResponseClans2> {
    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl2}?name=${searchValue}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseClans2>(searchUrl);
  }

  getTotalMembersById(id:number): Observable<number> {
    const searchUrl = `${this.baseUrl2}/getTotalMembersByClanId?id=${id}`;
    return this.httpClient.get<number>(searchUrl);
  }

  getTotalTrophiesById(id:number): Observable<number> {
    const searchUrl = `${this.baseUrl2}/getTotalTrophiesByClanId?id=${id}`;
    return this.httpClient.get<number>(searchUrl);
  }
}

interface GetResponseClans2 {
  content: Clan[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
