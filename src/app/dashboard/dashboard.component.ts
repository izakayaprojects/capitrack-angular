import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserCredService } from '../user-cred.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../app.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
  	private ucService: UserCredService,
  	private router: Router) {
  }

  ngOnInit() {
  }

}
