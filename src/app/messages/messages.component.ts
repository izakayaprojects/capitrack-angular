import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from "../messages.service";

import { AlertMessage, AlertType } from "../_models/alert";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessagesService) { }

  ngOnInit() {
  }

}
