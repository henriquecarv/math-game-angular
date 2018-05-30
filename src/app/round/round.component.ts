import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../app.component";
import { SocketService } from "../socket.service";

@Component({
  selector: "app-round",
  templateUrl: "./round.component.html",
  styleUrls: ["./round.component.css"]
})
export class RoundComponent implements OnInit {
  playerPoints = 0;
  firstOperand: number;
  secondOperand: number;
  result: number;
  operator: string;
  isValid: boolean;
  correctAnswered: boolean = false;

  operators = {
    1: "*",
    2: "+",
    3: "-",
    4: "/"
  };

  constructor(private app: AppComponent, private socketService: SocketService) {}

  isValidButton(): boolean {
    return this.isValid;
  }

  hasSameResults(): boolean {
    return (
      this.result ===
      eval(this.firstOperand + this.operator + this.secondOperand)
    );
  }

  checkAnswer(answer: boolean): void {
    this.isValid = false;
    if (answer) {
      if (this.hasSameResults()) {
        this.playerPoints++;
        console.log(`Correct ${this.playerPoints}`);
        if (!this.correctAnswered) {
          console.log("Not answered");
          this.app.setScore(this.playerPoints);
          this.socketService.socket.emit("answer", true);
        }
      } else {
        if (this.playerPoints > 0) {
          this.playerPoints--;
        }
        console.log(`Wrong ${this.playerPoints}`);
      }
    } else {
      if (this.hasSameResults()) {
        if (this.playerPoints > 0) {
          this.playerPoints--;
        }
        console.log(`Wrong ${this.playerPoints}`);
      } else {
        this.playerPoints++;
        console.log(`Correct ${this.playerPoints}`);
        if (!this.correctAnswered) {
          console.log("Not answered");
          this.app.setScore(this.playerPoints);
          this.socketService.socket.emit("answer", true);
        }
      }
    }
  }

  loadNewChallenge(): void {
    this.isValid = true;
    this.socketService.socket.emit("new-challenge", {});
  }

  ngOnInit() {
    this.isValid = true;
    this.socketService.socket.on("challenge", data => {
      this.firstOperand = data.firstOperand;
      this.secondOperand = data.secondOperand;
      this.operator = data.operator;
      this.result = data.result;
    });
    this.socketService.socket.on("answered", data => {
      if (data) {
        setTimeout(() => {
          this.loadNewChallenge();
        }, 5000);
      }
    });
  }
}
