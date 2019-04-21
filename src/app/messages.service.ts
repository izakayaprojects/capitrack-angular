import { Injectable } from '@angular/core';

import { AlertMessage, AlertType } from "./_models/alert";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

	private mAlert: AlertMessage = null;

  constructor() { }

	alert(type: AlertType, msg: string) {
		this.mAlert = { type: type, msg: msg };
	}

	hasAlert(): boolean {
		return this.mAlert !== null;
	}

	getType(): AlertType {
		return this.mAlert.type;
	}

	getMessage(): string {
		return this.mAlert.msg;
	}

	clear() {
		this.mAlert = null;
	}

}
