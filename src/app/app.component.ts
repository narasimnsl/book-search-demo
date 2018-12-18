import { Component } from '@angular/core';
import {UrlService} from './services/url.service'
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  titles = [];
  numberOfTitles = 0;
  total_pgs = new Array(0);
  pageNo = 1;
  sName ="";
  submit_disabled = true;
  display_result = false;
  display_error = false;

/*Constructor Function*/
  constructor(private urlService:UrlService,public ngxSmartModalService: NgxSmartModalService,private spinner: NgxSpinnerService){

  }
/*Function on Individual List Item are Clicked*/
  onModalViewClick(obj) {
    //console.log("Titele: "+JSON.stringify(obj));
    let uInfo = "Information unavailable"
    let modObj= {
    title: obj.title,
    author_name: obj.author_name ? obj.author_name.join(', '):uInfo,
    language:obj.language ? obj.language.join(', '):uInfo,
    subject:obj.subject ? obj.subject.join(', '):uInfo,
    publisher:obj.publisher ? obj.publisher.join(', '):uInfo,
    publish_date:obj.publish_date ? obj.publish_date.join(', '):uInfo,
    publish_place:obj.publish_place ? obj.publish_place.join(', '):uInfo
    }
    this.ngxSmartModalService.setModalData(modObj, 'myModal',true);
    this.ngxSmartModalService.getModal('myModal').open() 
  }
/* Function on Input Change */
  onTitleEntry(event){
   this.titles = [];
   this.pageNo = 0;
   this.total_pgs = new Array(0);
   this.submit_disabled = event.target.value.trim()==="";
   this.display_result = false;
   this.display_error = false;
  }
  /* Function on Page no. Pressed*/
  onPageChange(pg){
    this.pageNo = pg
    this.titles=[];
    this.sName = this.sName+'&page='+pg;
    this.spinner.show();
    this.urlService.getTitleSearch(this.sName)
    .subscribe(
      (data) => {
        this.spinner.hide();
        this.titles = data.docs;
      },
      (error) => {
        this.spinner.hide();
        this.display_error = true
      }
    )
  }
  /* Function on Submit Button Pressed*/
  onSearchTitle(name: string) {
    this.spinner.show();
    this.submit_disabled = true;
    this.sName = name.replace(/\s+/g, '+')
    this.urlService.getTitleSearch(this.sName)
    .subscribe(
      (data) => {
        this.spinner.hide();
        this.titles = data.docs;
        this.numberOfTitles  = data.num_found;
        this.total_pgs = new Array(this.numberOfTitles)
        this.display_result = true;
        
      },
      (error) => {
        this.spinner.hide();
        this.display_error = true;
      }

    )
  }

  
}
