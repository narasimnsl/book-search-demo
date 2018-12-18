import {Injectable} from '@angular/core'
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
/* to Fetch json Data */
export class  UrlService { 
    constructor(private http:Http ){}
   
     getTitleSearch(_sName:string){
         let seachURL = "//openlibrary.org/search.json?title="+_sName
         return this.http.get(seachURL)
         .map(
             (response:Response) => {
             const data = response.json();
             return data;
             }
         )   
     }
}