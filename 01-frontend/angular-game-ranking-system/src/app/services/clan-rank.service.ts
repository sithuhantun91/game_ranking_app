import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../common/user";
import {ClanRank} from "../common/clan-rank";

@Injectable({
  providedIn: 'root'
})
export class ClanRankService {

  private baseUrl = 'http://localhost:8080/api/clan-rank';

  constructor(private httpClient: HttpClient) { }

  getClanRank(id: number): Observable<ClanRank> {
    return this.httpClient.get<ClanRank>(this.baseUrl + '/' + id);
  }
}
