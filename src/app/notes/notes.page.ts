import { Component, OnInit } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  constructor(  private alertController: AlertController,
               private http: HttpClient,
               private router: Router


    ) { }

  ngOnInit() {

  }


  Addnote( myform : NgForm) : void {




    let  note = { id: localStorage.getItem("UserId") , boissonid : localStorage.getItem("boissonId")   ,note: myform.value.note , commentaire : myform.value.commantaire };


    console.log(note);


    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/notes', note , {
      headers: headers
        }).subscribe( (data : any ) =>  {

          if(data){
           // console.log(data);

            this.presentAlert("Add Note successful", ""," Thanks For Your FeedBack ");


            this.router.navigate(['/home']);

          }else{

            this.presentAlert("Alert", "Add Note not successful","Please Verify Your Data");
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


