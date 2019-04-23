import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

import { UserCredService } from "../user-cred.service";
import { CONSTANTS } from '../global';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	@Input() currentNavigation = ""

	isLoggingOut = false

  constructor(
  	private ucService: UserCredService,
    private router: Router,
  	private localStorage: LocalStorageService) { }

  ngOnInit() {
  }

  logout() {
  	this.isLoggingOut = true;
  	this.ucService.logout().subscribe(res => {
  		this.localStorage.clear(CONSTANTS.LSKEY_TOKEN);
      this.router.navigate(["/login"]);
      this.isLoggingOut = false;
  	})
  }

}
