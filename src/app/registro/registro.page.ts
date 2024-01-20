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

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public router: Router,
    public navCtrl: NavController
  ) {
    this.formularioRegistro = this.fb.group({
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
    });
  }

  ngOnInit() {}

  async registrarse() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Tienes que llenar todos los campos con sus datos correctos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    // Obtener usuarios almacenados o inicializar la lista si aún no hay usuarios
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si el nombre de usuario ya está registrado
    const usuarioExistente = usuarios.find(u => u.nombre === f.nombre);

    if (!usuarioExistente) {
      var usuario = {
        nombre: f.nombre,
        password: f.password
      };

      // Agregar el nuevo usuario a la lista
      usuarios.push(usuario);

      // Guardar la lista de usuarios actualizada en el localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      localStorage.setItem('ingresado', 'true');
      this.navCtrl.navigateRoot('home');
    } else {
      const alert = await this.alertController.create({
        header: 'Error de Registro',
        message: 'El nombre de usuario ya está en uso. Por favor, elige otro nombre de usuario.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }
}


