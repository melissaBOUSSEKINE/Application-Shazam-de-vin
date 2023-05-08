import { Component } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { HttpClient , HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  constructor(
    private http: HttpClient,
  ) {}



  signIn(form : NgForm) : void {

    console.log(form.value);

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/signIn', form.value , {
        headers: headers
          }).subscribe( (data ) =>  {
            console.log(data);

          })


  }

}
