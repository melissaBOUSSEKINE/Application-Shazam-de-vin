import { Component, OnInit } from '@angular/core';
import { createWorker} from 'tesseract.js'
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { Camera, CameraResultType , CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // traitement OCR
  worker: Tesseract.Worker;
  workerReady = false;

  image = '';
  ocrResult = '';
  captureProgress = 0;


  constructor(private http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    ) {
    this.loadWorker();

  }

  ngOnInit() {
  }

  async captureImage (){
    const image = await Camera.getPhoto({
      quality : 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera

    });

    console.log('image' , image);
    this.image = image.dataUrl;
  }

  async loadWorker() {
    this.worker  = createWorker({
      logger : progress => {
        console.log(progress);
        if (progress.status == 'recognizing text'){
          this.captureProgress = parseInt('' + progress.progress * 100);
        }
      }
    })

    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    console.log('FIN')
    this.workerReady = true;
  };


  async recognizeImage() {
    const result = await this.worker.recognize(this.image);
    console.log(result);

    this.ocrResult = result.data.text;



  }

  // Envoyer les infos
  scan(){

    const text = '{"name":""}';
    const obj = JSON.parse(text);




          obj.name = this.ocrResult.replace('.', '').replace(/\n/g, " ").replace(' ','');

          console.log(obj);


            const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');

            this.http.post('http://localhost:8080/scan', obj , {
              headers: headers
                }).subscribe( (data : any )  =>  {

                  if(data){
                    console.log(data);


                    localStorage.setItem("commentaires", JSON.stringify(data.commentaires))



                    this.presentAlert("Scan Success", "","");

                    this.router.navigate(['/infos']);

                    localStorage.setItem("boissonId", data.id)
                    localStorage.setItem("name" , data.name);
                    localStorage.setItem("provenance" , data.provenance);
                    localStorage.setItem("categorie" , data.categorie);
                    localStorage.setItem("logo" , data.logo);
                    localStorage.setItem("embouteilleur" , data.embouteilleur);
                    localStorage.setItem("tava" , data.tava);
                    localStorage.setItem("message_sanitaire" , data.message_sanitaire);
                    localStorage.setItem("numero_lot" , data.numero_lot);
                    localStorage.setItem("volume" , data.volume);
                    localStorage.setItem("couleur" , data.Couleur);







                  }else {
                    this.presentAlert("Alert", "Infos non Trouvé","Pouvez Vous Prender une autre Image");
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
