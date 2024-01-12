import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/app/model/article.model';
import { DocumentItem } from 'src/app/model/document-item.model';
import { WHDocument } from 'src/app/model/wh-document.model';
import { DocumentsService } from 'src/app/service/documents.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent {

	constructor(private service:DocumentsService,private route:ActivatedRoute) {
	}

  articles:Article[] = [];
  document: WHDocument = new WHDocument();
  documentItem: DocumentItem[] = [];
  docId:number =0;

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.docId = params['id'];
      this.getDocument()
      this.getArticles()
      this.getDocumentItem()
    })
  }

  form = new FormGroup({
    article: new FormControl("",Validators.required),
    price: new FormControl("",Validators.required),
    quantity: new FormControl("",Validators.required),
  })

  addItem() {
    let newItem = new DocumentItem(this.form.value)
    newItem.documents = this.docId;
    this.service.newDocumentItem(this.docId,newItem).subscribe({
      next:(data:DocumentItem) => {
        
        this.getDocumentItem()
      }
    })
  }

  articleName(articleCode:string) {
    let articleName='';
    for(let article of this.articles) {
      if (article.code == articleCode) {
        articleName= article.name
      }
      
    }
    return articleName
  }

  getDocumentItem() {
    this.service.getItems(this.docId).subscribe({
      next:(data:DocumentItem[]) => {
        this.documentItem=data;
        console.log(this.documentItem)
        
      }
    })
  }

  onRecord() {
    if(this.document.status == 'opened') {
      this.document.status = 'recorded';
      this.document.dateOfRecording= new Date().toString()
      this.service.recordDocument(this.document,this.docId).subscribe({
        next:(data:WHDocument) => {
     
        }
      })
    }
    this.getDocument()

  }

  getDocument() {
    this.service.getOne(this.docId).subscribe({
      next:(data:WHDocument) => {
        this.document = data;
     
      }
    })
  }

  getArticles() {
    this.service.getArticles().subscribe({
      next:(data:Article[]) => {
        this.articles=data;
   
      }
    })
  }

  

}
