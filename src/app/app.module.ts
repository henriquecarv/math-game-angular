import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppComponent } from './app.component';
import { SocketService } from './socket.service';
import { RoundComponent } from './round/round.component';
import { WaitComponent } from './wait/wait.component';

@NgModule({
  declarations: [AppComponent, RoundComponent, WaitComponent],
  imports: [BrowserModule, AlertModule.forRoot()],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
