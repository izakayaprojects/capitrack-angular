import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import { API_ENV, CONSTANTS } from './global';

@Injectable({
  providedIn: 'root'
})

export class UserCredService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService) { }

  check_login(email: string, pass: string) {
  	return this.http.post(API_ENV.debug.url+"/login", 
  		{email: email, password: pass}
		);
  }

  get_active_user() {
    let token = this.localStorage.retrieve(CONSTANTS.LSKEY_TOKEN);
    return this.check_token_validity(token).pipe(flatMap(validity => {
      if (validity["valid"] === true) {
        return this.get_user(token);
      } else {
        return of({});
      }
    }));
  }

  get_user(token: String) {
    return this.http.post(API_ENV.debug.url+"/user", {token: token})
  }

  check_token_validity(token: string) {
  	return this.http.post(API_ENV.debug.url+"/token_validity", {token: token})
  }

  check_session(): Observable<boolean> {
    let token = this.localStorage.retrieve(CONSTANTS.LSKEY_TOKEN)
    if (token === null || token === "") {
      return of(false)
    } else {
      return this.http.post(API_ENV.debug.url+"/token_validity", {token: token})
        .pipe(map(result => {
          if (!result["valid"]) {
            this.localStorage.clear(CONSTANTS.LSKEY_TOKEN);
            return false;
          } else {
            return true;
          }
        }))
    }
  }
}
