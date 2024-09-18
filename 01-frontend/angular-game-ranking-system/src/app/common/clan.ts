import {User} from "./user";

export class Clan {

  public id: number;
  public name: string;
  public maxNumOfMembers: number;
  public requiredTrophies: number;
  public totalMembers: number;
  public totalTrophies: number;

  constructor(

  ) {
    this.id = 0;
    this.name = '';
    this.maxNumOfMembers = 0;
    this.requiredTrophies = 0;
    this.totalMembers = 0;
    this.totalTrophies = 0;
  }
}
