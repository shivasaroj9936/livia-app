import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }
  
  uploadImage(data: any): Observable<any> {
    let head=new HttpHeaders({'liviaapp-token':`${localStorage.getItem('access_token')}`})
    console.log(data,"Upload img service!",head);
    return this.http.patch(Constant.imgUrl, data,{headers:head});
  }

  deleteImage(data: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'liviaapp-token':`${localStorage.getItem('access_token')}`,
      }),
      body: {
        'image':[data]
      },
    };
    console.log(data,"delete serviceeeeeeeeee",options);
    return this.http.delete(Constant.imgUrl, options);
  }
}
