import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  score: number;
  title = 'math-game';
  connected: number;
  max_users = false;

  constructor(private socketService: SocketService) {}

  setScore(value: number): void {
    this.score = value;
  }

  ngOnInit(): void {
    this.score = 0;
    this.socketService.socket.on('connected', data => {
      this.connected = data;
      if (data <= environment.max_users) {
        this.max_users = true;
      } else {
        this.connected = environment.max_users;
      }
    });
  }
}
