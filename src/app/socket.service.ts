import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { environment } from "../environments/environment";

@Injectable()
export class SocketService {
  private url = environment.socket;
  public socket;

  constructor() {
    this.socket = io(this.url);
  }
}
