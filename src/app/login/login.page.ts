import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
//import { DbService } from '../servicio/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombre: String;
  loginForm: FormGroup; //se utilizará para manejar el formulario de inicio de sesión.

  constructor(public formBuilder: FormBuilder,private router: Router,  //Inyecta el servicio FormBuilder para ayudar en la creación de formularios reactivos.
    public alertController: AlertController,
    public navControl: NavController) {
    this.loginForm = this.formBuilder.group ({   //Se aplican validaciones como requisito, longitud mínima y máxima para cada campo
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
 
    async login(){  //Se define un método login que se ejecuta cuando se intenta iniciar sesión.
      var f = this.loginForm.value;
  
      var usuario = JSON.parse(localStorage.getItem('usuario'));  //Realiza la validación comparando los datos ingresados con los almacenados en el almacenamiento local (localStorage)
  
      if(usuario.nombre == f.nombre && usuario.password == f.password){
        console.log('Ingresado');
        localStorage.setItem('ingresado','true');
        this.navControl.navigateRoot('home');   //credenciales correctas navega a home
        //this.router.navigate(['/home']);      //de lo contrario redirige a inicio sesion
        
      }
      else{
        this.router.navigate(['/login']);
        const alert = await this.alertController.create({
          header: 'Datos Incorrectos',
          message: 'Los datos que ingresaste no estan en la base de datos.',
          buttons: ['Aceptar']
          
        });
    
        await alert.present();
      }
    
  }


  Registro(){
    this.router.navigate(['/registro']);  //navega a la página de registro cuando se llama.
  }
  
  

}
