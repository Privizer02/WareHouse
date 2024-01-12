import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { WHDocument } from '../model/wh-document.model';
import { WHDocumentList } from '../model/wh-document-list.model';
import { HttpClient, HttpParams } from '@angular/common/http';
const baseURL ="http://localhost:3000/api/documents";
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http:HttpClient) { }

  getDocuments(params?:any):Observable<WHDocumentList> {

    let options = {}
    if(params) [
      options = {
        params :new HttpParams().set('sort',params.sort||"").set('sortDirection',params.sortDirection||"")
        .set('page',params.page||"").set('pageSize',params.pageSize||"")
      }
    ]

    return this.http.get(baseURL,options).pipe(map((data:any) => {return new WHDocumentList(data)}))
    
  }
}
