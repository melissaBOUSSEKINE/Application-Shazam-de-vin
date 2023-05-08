import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-infos',
  templateUrl: './infos.page.html',
  styleUrls: ['./infos.page.scss'],
})
export class InfosPage implements OnInit {

  name = localStorage.getItem("name");
  logo =  localStorage.getItem("logo");
  categorie =  localStorage.getItem("categorie");
  provenance = localStorage.getItem("provenance");
  embouteilleur =  localStorage.getItem("embouteilleur" );
  tava = localStorage.getItem("tava" );
  message_sanitaire =  localStorage.getItem("message_sanitaire" )
  numero_lot =  localStorage.getItem("numero_lot" );
  volume =   localStorage.getItem("volume");
  couleur =   localStorage.getItem("couleur");

   commentaires = JSON.parse(localStorage.getItem("commentaires"));






  constructor(    private router: Router,
    ) {

  }

  ngOnInit() {



   //console.log(commentaires);

  }


    retour(){

      this.router.navigate(['/home']);



    }


    addnotes(){

      this.router.navigate(['/notes']);

    }








}
