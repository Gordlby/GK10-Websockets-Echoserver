import { Component } from '@angular/core';
import { WsService } from './ws.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  providers: [WsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  form: FormGroup;
  ws: WsService = new WsService();
  text: string = "Websocket";

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      text: ['']
    })
  }

  ngOnInit() {
    this.ws.connectSocket();
  }

  onTest() {
    this.sendMessage("test");
  }
  onSend(event: Event) {
    event.preventDefault();
    console.log(this.form);
    if (this.form.value.text === '') {
      console.error("Message is empty");
      this.text = "[ERROR] Message is empty";
      return;
    }
    this.sendMessage(this.form.value.text);
  }
  private sendMessage(message: string) {
    this.ws.sendMessage(message, (response: string) => {
      console.log("Response from server: ", response);
      this.text = 'Serverantwort: "' + response + '"';
    });
  }
}
