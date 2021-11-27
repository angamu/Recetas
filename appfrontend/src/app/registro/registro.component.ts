import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  apiURL: string = 'http://localhost:8080/api/registro';
  nombre: string = '';
  usuario: string = '';
  contrasena: string = '';
  msgRegistro=false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  registrarUser(){
    const userdata = {datau: this.nombre, user: this.usuario, pass: this.contrasena};
    this.httpClient.post<any>(`${this.apiURL}`, userdata).subscribe( res => {
        if (res.body == "registrado") {
          this.msgRegistro=true;
        } else {
          this.msgRegistro=false; 
        }
    });

  }
}
