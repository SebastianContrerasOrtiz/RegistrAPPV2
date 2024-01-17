import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  usuario: any;

  token = localStorage.getItem("token"); //Asigna el valor recuperado del elemento "token" en el almacenamiento local al miembro de la clase llamado token
  //El método getItem se utiliza para obtener el valor asociado con la clave "token" almacenado en el almacenamiento local del navegador.
  constructor( public router: Router, public navCtrl: NavController) {}

  ngOnInit() {
    console.log("token: ", this.token); //Imprime en la consola el valor actual de la variable token
    localStorage.removeItem("token");
  }


  logout(){
    //localStorage.removeItem('ingresado');
    this.navCtrl.navigateRoot('login');
  }

}
