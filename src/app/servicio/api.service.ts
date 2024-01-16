import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public _http: HttpClient) { }

  obtenerDatos<T> (url : string){ //T se utilizará para indicar el tipo de los datos que se espera recibir de la solicitud HTTP.

    url = 'https://jsonplaceholder.typicode.com/users';
    return this._http.get<T[]>(url);  //Realiza una solicitud HTTP GET utilizando el servicio HttpClient
    
  }
}
