import { Component, OnInit, Input } from '@angular/core';
import { UserCredService } from '../user-cred.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { CONSTANTS } from '../global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	@Input() username: string = "";
	@Input() password: string = "";

	loginErrorMessage: string;

  constructor(
    private ucService: UserCredService,
    private router: Router,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
  }

  onLogin(): void {
  	// send http login check
  	this.ucService.check_login(this.username, this.password)
  		.subscribe(result => {
        var token = result["data"].token.authentication_key;
        this.localStorage.store(CONSTANTS.LSKEY_TOKEN, token);
        this.router.navigate(["/dashboard"]);
  		}, err => this.loginErrorMessage = err.error.error.message
  		);
  }

}
