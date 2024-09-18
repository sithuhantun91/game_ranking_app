import {Role} from "./role";
import {Clan} from "./clan";
import {ClanRank} from "./clan-rank";

export class User {

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public trophies: number;
    public clan: Clan;
    public role: Role;
    public clanRank: ClanRank;

  constructor(

  ) {
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.trophies = 0;
    this.clan = new Clan();
    this.role = new Role();
    this.clanRank = new ClanRank();
  }
}
