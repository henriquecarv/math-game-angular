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

  constructor(
    private app: AppComponent,
    private socketService: SocketService
  ) {}

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
        if (!this.correctAnswered) {
          this.rightAnswer();
        }
      } else {
        if (this.playerPoints > 0) {
          this.playerPoints--;
        }
      }
    } else {
      if (this.hasSameResults()) {
        if (this.playerPoints > 0) {
          this.playerPoints--;
        }
      } else {
        this.playerPoints++;
        if (!this.correctAnswered) {
          this.rightAnswer();
        }
      }
    }
  }

  rightAnswer(): void {
    this.correctAnswered = true;
    alert("Congratulations! One Point for you");
    this.app.setScore(this.playerPoints);
    this.socketService.socket.emit("answer", true);
  }

  loadNewChallenge(): void {
    setTimeout(() => {
      this.isValid = true;
      this.correctAnswered = false;
      this.socketService.socket.emit("new-challenge", {});
    }, 5000);
  }

  ngOnInit() {
    this.isValid = true;
    this.socketService.socket.on("challenge", data => {
      this.firstOperand = data.firstOperand;
      this.secondOperand = data.secondOperand;
      this.operator = data.operator;
      this.result = data.result;
    });
    this.socketService.socket.on("answered", () => {
      if (!this.correctAnswered) {
        alert("This round has ended! A new one will start in 5 seconds.");
        this.loadNewChallenge();
      }
    });
  }
}
