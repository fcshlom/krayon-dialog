import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_GET_COINS } from '../consts/api-url.consts';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _walletsJSON = 'assets/mock-data/wallets.json';

  constructor(private http: HttpClient) {}
 

  getWallets(): Observable<any> {
    return this.http.get(this._walletsJSON);
  }

  getCurrency(): Observable<any> {
    return this.http.get(URL_GET_COINS);
  }

}

  