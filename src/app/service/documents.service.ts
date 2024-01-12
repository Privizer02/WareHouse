import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { WHDocument } from '../model/wh-document.model';
import { WHDocumentList } from '../model/wh-document-list.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from '../model/article.model';
import { DocumentItem } from '../model/document-item.model';
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

  getOne(id:number):Observable<WHDocument> {
    return this.http.get(baseURL+'/'+id).pipe(map((data:any) => {return new WHDocument(data)}))
  }
  getArticles():Observable<Article[]> {
    return this.http.get('http://localhost:3000/api/articles').pipe(map((data:any) => {return data.results.map((elem:any) =>{return new Article(elem)})}))
  }

  recordDocument(doc:WHDocument,docId:number):Observable<WHDocument> {
    return this.http.put(baseURL+'/'+docId,doc).pipe(map((data:any) => {return new WHDocument(data)}))
  }

  getItems(documentId: number): Observable<DocumentItem[]> {
    return this.http.get(`${baseURL}/${documentId}/items`).pipe(map((data:any) => {
      return data.results && data.results.map((x: any) => new DocumentItem(x)) || [];
    }))
  }

  newDocumentItem(docId:number,newDoc:DocumentItem):Observable<DocumentItem> {
    return this.http.post(baseURL+'/'+docId+'/items',newDoc).pipe(map((data:any) => {return new DocumentItem(data)}))
  }
}
