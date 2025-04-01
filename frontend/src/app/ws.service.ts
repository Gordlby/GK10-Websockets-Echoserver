import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket("ws://localhost:8080/")
  }

  connectSocket()  { 
    this.ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    this.ws.onmessage = (event) => {
      console.log("Message from server: ", event.data);
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  sendMessage(message: string, callback?: (response: string) => void) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
      console.log("Message sent: ", message);

    this.ws.onmessage = (event) => {
        console.log("Response from server: ", event.data);
        if (callback) {
          callback(event.data);
        }
    };
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  }

}
