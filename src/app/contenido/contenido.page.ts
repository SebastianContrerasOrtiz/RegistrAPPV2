import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../servicio/api.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.page.html',
  styleUrls: ['./contenido.page.scss'],
})
export class ContenidoPage implements OnInit {  //ApiService se utiliza para realizar solicitudes HTTP.

  getData: any[]=[];

  constructor(public router: Router,public _services: ApiService) { 
    this._services.obtenerDatos<any []>("").subscribe(data => {  //Aquí se llama al método obtenerDatos del servicio ApiService
      this.getData = data
      console.log(this.getData); //La respuesta de la solicitud HTTP se asigna a la variable getData.


    })
  }

  ngOnInit() {
  }

  closeHistorial(){
    this.router.navigate(['/home']);   //se redirige a home
  }

}
