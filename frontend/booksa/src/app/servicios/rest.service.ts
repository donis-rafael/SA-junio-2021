import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


  const httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: {}
  };

const address = 'http://34.68.53.63:4091/'
const address2 = 'http://34.68.53.63:4091/'

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private httpClient: HttpClient) { }

  GetRequest(serverAddress: string): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.get<any>(address + serverAddress, { observe: 'response' });
  }

  GetRequest2(serverAddress: string): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.get<any>(address2 + serverAddress, { observe: 'response' });
  }

  PutRequest(serverAddress: string, info: object): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.put<any>(address + serverAddress, info, {observe:'response'});
  }

  PutRequest2(serverAddress: string, info: object): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.put<any>(address2 + serverAddress, info, {observe:'response'});
  }

  PostRequest(serverAddress: string, info: object): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.post<any>(address + serverAddress, info, { observe: 'response' });
  }

  PostRequest2(serverAddress: string, info: object): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.post<any>(address2 + serverAddress, info, { observe: 'response' });
  }

  /**
   * Nuevo sistema de rest ahora desde constantes
   * @param serverAddress
   * @returns
   */
  GetReq(serverAddress: string): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.get<any>(serverAddress, { observe: 'response' });
  }

  PutReq(serverAddress: string, info: object): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.put<any>(serverAddress, info, { observe: 'response' });
  }

  /**
   * Nuevo sistema de rest ahora desde constantes
   * @param serverAddress
   * @param info
   * @returns
   */
  PostReq(serverAddress: string, info: object): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.post<any>(serverAddress, info, { observe: 'response' });
  }

  //   PutRequest(serverAddress: string, info: object): Observable<any> {
  //     return this.httpClient.put<any>(address + serverAddress, info, {observe:'response'});
  //   }

  //   DeleteRequest(serverAddress: string): Observable<any> {
  //     return this.httpClient.delete<any>(address + serverAddress, {observe:'response'});
  //   }
}
