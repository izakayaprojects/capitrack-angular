import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserCredService } from '../user-cred.service';

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	
	constructor(
		private ucService: UserCredService,
		private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.ucService.check_session().pipe(map(result => {
			if (!result) this.router.navigate(["/login"]);
			return result;
		}))
	}
}

