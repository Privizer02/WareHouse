import { Component } from '@angular/core';
import { DocumentsService } from '../service/documents.service';
import { WHDocumentList } from '../model/wh-document-list.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  documents:WHDocumentList = new WHDocumentList()
	constructor(private service:DocumentsService) {
	}

  showSettings = false;
  settings = {
    dateOfCreation: true,
    dateOfRecording:true,
    status:true,
    transactionType:true,
    businessPartner:true,
    businessPartnerLocation:true,
    year:true

  }


  params = {
    page:1,
    pageSize:10,
    sort:'',
    sortDirection:'desc'
  }

  ngOnInit() {
    this.getDocuments()
  }

  changeSort(sort:string) {
    this.params.sort = sort;
    
    if(this.params.sortDirection =='asc') {
      this.params.sortDirection ='desc' 
      
    } else if (this.params.sortDirection=='desc') {
      this.params.sortDirection='asc'
      
    }
    this.getDocuments()
  }

  getDocuments() {
    this.service.getDocuments(this.params).subscribe({
      next:(data:WHDocumentList) => {
        this.documents = data;
        
      }
    })
  }

}
