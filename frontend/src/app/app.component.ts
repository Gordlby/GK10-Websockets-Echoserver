import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WsService } from './ws.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  providers: [WsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  form: FormGroup;
  ws: WsService = new WsService();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      text: ['']
    })
  }

  ngOnInit() {
    this.ws.connectSocket();
  }

  onTest() {
    this.ws.sendMessage("test");
  }
  onSend(event: Event) {
    event.preventDefault();
    console.log(this.form);
    if (this.form.value.text === '') {
      console.error("Message is empty");
      return;
    }
    this.ws.sendMessage(this.form.value.text);
  }
}
