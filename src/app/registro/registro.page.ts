import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  
  constructor(public fb: FormBuilder,
    public alertController: AlertController, public router: Router, public navCtrl: NavController) {
      this.formularioRegistro = this.fb.group ({
        nombre: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15)
  
        ])),      
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10)
        ]))
      })
  }

  ngOnInit() {
  }

  async registrarse(){     //método registrarse
    var f = this.formularioRegistro.value;    //formularioRegistro es un formulario Angular y f contiene los valores ingresados por el usuario.

    if(this.formularioRegistro.invalid){  //Realiza una verificación para asegurarse de que el formulario no esté en un estado inválido. 
      //this.router.navigate(['/registro']);
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Tienes que llenar todos los campos con sus datos correctos',
        buttons: ['Aceptar']
      });
  
      await alert.present();   //Se utiliza await para esperar la presentación de la alerta antes de continuar.

      return;
    }else{
      this.navCtrl.navigateRoot('home'); //Si el formulario es válido navega a la ruta home 
    }

    var usuario = {     //Crea un objeto usuario con propiedades nombre y password utilizando los valores del formulario.
      nombre: f.nombre,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));   //Almacena el objeto usuario en el localStorage
                                                              //persistirá los datos del usuario en el almacenamiento local del navegador.

    localStorage.setItem('ingresado','true'); //Establece un indicador en el localStorage que indica que el usuario ha iniciado sesión.
    this.navCtrl.navigateRoot('home');
  }
}


//registtro de usuarios
//validacion formularios
//almacenamiento en el localstorage