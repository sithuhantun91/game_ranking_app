import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BattleLog} from "../common/battle-log";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BattleLogService {
  private baseUrl = 'http://localhost:8080/api/battle-log';
  private baseUrl2 = 'http://localhost:8080/api2/battle-log';

  constructor(private httpClient: HttpClient) { }

  addBattleLog(battleLog: BattleLog) {
    return this.httpClient.post<BattleLog>(this.baseUrl2, battleLog);
  }

  getBattleLogsPaginate(loginId: number,
                      thePage: number,
                      thePageSize: number): Observable<GetResponseBattleLogs2> {
    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl2}?loginId=${loginId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseBattleLogs2>(searchUrl);
  }

  getBattleLogsPaginate2(thePage: number,
                        thePageSize: number): Observable<GetResponseBattleLogs2> {
    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl2}/getAllBattleLog?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseBattleLogs2>(searchUrl);
  }

  getBattleWonByUserId(userId: number) {
    const searchUrl = `${this.baseUrl2}/getBattleWonByUserId?userId=${userId}`;
    return this.httpClient.get<number>(searchUrl);
  }
}

interface GetResponseBattleLogs2 {
  content: BattleLog[],
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
