import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SocketService } from "./socket.service";
import { RoundComponent } from "./round/round.component";

@NgModule({
  declarations: [AppComponent, RoundComponent],
  imports: [BrowserModule],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
