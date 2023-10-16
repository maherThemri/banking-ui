import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { TransactionDto } from './transaction-dto';
import { Observable } from 'rxjs';
import { UserDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FirstService {

  rootUrl = 'http://localhost:8080';
  apiUrl = 'http://localhost:8080/auth/register';

  constructor(
    private httpClient: HttpClient
  ) { }

  registerV1(obj: UserDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(this.apiUrl, obj);
  }
  /* findAllTransactionsV1(): Observable<TransactionDto[]> {

    let jwt = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZWhlcnRoZUBnbWFpbC5jb20iLCJleHAiOjE2OTc4NDM1OTksImlhdCI6MTY5NzEyMzU5OSwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XX0.v8hZ3cpGcKSP-ZysUWEix36guc6Zhf5NAZdWEYDDRkk";
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.httpClient.get<TransactionDto[]>(this.rootUrl + '/transactions/', { headers: httpHeaders });
  } */

  findAllTransactions(): Observable<any> {
    let _headers: HttpHeaders = new HttpHeaders();
    _headers = _headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZWhlcnRoZUBnbWFpbC5jb20iLCJleHAiOjE2OTc4NDM1OTksImlhdCI6MTY5NzEyMzU5OSwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XX0.v8hZ3cpGcKSP-ZysUWEix36guc6Zhf5NAZdWEYDDRkk');
    const request = new HttpRequest<any>(
      'GET',
      this.rootUrl + '/transactions/',
      {
        headers: _headers,
        params: null,
        responseType: 'json'
      }
    );
    return this.httpClient.request(request)
      .pipe(
        filter(r => r instanceof HttpResponse),
        map(res => res as any)
      );
  }

  findAllTransactionsV2(): Observable<Array<TransactionDto>> {
    let _headers: HttpHeaders = new HttpHeaders();
    _headers = _headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZWhlcnRoZUBnbWFpbC5jb20iLCJleHAiOjE2OTc4NDM1OTksImlhdCI6MTY5NzEyMzU5OSwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XX0.v8hZ3cpGcKSP-ZysUWEix36guc6Zhf5NAZdWEYDDRkk');
    return this.httpClient.get(
      this.rootUrl + '/transactions/',
      {
        headers: _headers
      }
    ).pipe(
      filter(r => r instanceof HttpResponse),
      map(res => {
        console.log(res);
        return (res as HttpResponse<TransactionDto>).body as Array<TransactionDto>;
      })
    );
  }
}
