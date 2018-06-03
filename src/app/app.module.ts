import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { SocketService } from './socket.service';
import { RoundComponent } from './round/round.component';
import { WaitComponent } from './wait/wait.component';

@NgModule({
  declarations: [AppComponent, RoundComponent, WaitComponent],
  imports: [BrowserModule, BsDropdownModule.forRoot()],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
