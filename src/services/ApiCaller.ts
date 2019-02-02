import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiVersion} from '../dataobjects/ApiVersion';
import {Observable} from 'rxjs';

@Injectable()
export class ApiCaller {
  constructor(private http: HttpClient) { }

  baseApiUrl = 'http://localhost:8080/api/';
  versionCheck = 'version-check';

  getVersion() {
    return this.http.get(this.baseApiUrl + this.versionCheck);
  }
  getVersionX(): Observable<ApiVersion> {
    return this.http.get<ApiVersion>(this.baseApiUrl + this.versionCheck);
  }
}
