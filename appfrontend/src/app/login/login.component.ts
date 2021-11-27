import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiURL: string = 'http://localhost:8080/api/login';
  usuario: string = '';
  contrasena: string = '';
  msgInicioErr=false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  
  ngOnInit(): void {
  }

  ingresarApp(){
    const userdata = {user: this.usuario, pass: this.contrasena};
    this.httpClient.post<any>(`${this.apiURL}`, userdata).subscribe( res => {
        if (res.body == "valido") {
          this.router.navigate(['registro']);
          this.msgInicioErr = false;
        } else {
          this.msgInicioErr = true;
        }
    });

  }
}
