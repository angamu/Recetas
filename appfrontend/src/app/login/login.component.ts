import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiURL: string = 'http://localhost:8080/api/login';
  usuario: string = '';
  contrasena: string = '';

  constructor(private httpClient: HttpClient, router:Router) { }

  
  ngOnInit(): void {
  }

  ingresarApp(){

    const userdata = {user: this.usuario, pass: this.contrasena};
    this.httpClient.post<any>(`${this.apiURL}`, {hola:"cher"})
    .subscribe((res)=>{
        this.router.navigate("")
        console.log(res);
    });

  }
}
