import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { WebsocketServiceService } from './service/websocket-service.service';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CommonModule],
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'org';

  receivedMessages: string[] = [];

  constructor(private websocketService: WebsocketServiceService) { }

  ngOnInit(): void {
    this.websocketService.connect();
    this.websocketService.messageReceived.subscribe((message: string) => {
      this.receivedMessages.push(message);
    });
  }  

  sendMessage(): void {
    const message = 'Hello, WebSocket!';
    this.websocketService.sendMessage(message);
  }

  openConnection(): void {
    this.websocketService.connect();
  }

  closeConnection(): void { 
    this.websocketService.closeConnection();
  }

}
