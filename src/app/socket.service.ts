import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
  private url = "http://math-game.us-east-2.elasticbeanstalk.com/";
  public socket;

  constructor() {
    this.socket = io(this.url);
  }
}
