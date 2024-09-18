import {User} from "./user";

export class BattleLog {
  public id: number;
  public logTime: Date;
  public winner: number;
  public player1: User;
  public player2: User;

  constructor(

  ) {
    this.id = 0;
    this.logTime = new Date();
    this.winner = 0;
    this.player1 = new User();
    this.player2 = new User();
  }
}
