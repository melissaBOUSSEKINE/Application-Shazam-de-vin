import { Component } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Http  } from '@capacitor-community/http';


import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';





@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private http: HttpClient,
    private alertController: AlertController,
    private router: Router) {}


  login(form : NgForm) : void {

    console.log(form.value);







   const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/login', form.value , {
        headers: headers
          }).subscribe( (data : any ) =>  {

            if(data){
             // console.log(data);

              this.presentAlert("Login successful", "","Hello "+data.prenom);

              localStorage.setItem("UserId", data.id);



              this.router.navigate(['/home']);

            }else{

              this.presentAlert("Alert", "User Not Founded","You can easy create a new Account");
            }

          })

  }


  async presentAlert(title, data , msg) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: data ,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }









}
