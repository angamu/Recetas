import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  apiURL: string = 'http://localhost:8080/api/recetas';
  name = 'Angular';
  recetas: Array<any> = [];
  panelLogin=false;
  panelRegistro=false;
  panelHome=true;
  panelRecetario=false;
  constructor(private httpClient: HttpClient) {}

  ngOnInit(){
    this.getRecetas();
  }

  public getRecetario(url?: string){   
    return this.httpClient.get<any>(`${this.apiURL}`,
    { observe: 'response' }).pipe(tap(res => {
      return res;
    }));
  }

  getRecetas() {
    this.recetas = [];
    this.getRecetario().subscribe(res => {  
      this.recetas = res.body;
    });
  }

  iniciarSesion(){
    this.panelRegistro=false;
    if (this.panelLogin) {
      this.panelLogin=false;  
    } else {
      this.panelLogin=true;  
    }    
  }

  registroUsuario(){
    this.panelLogin=false;
    if (this.panelRegistro) {
      this.panelRegistro=false;  
    } else {
      this.panelRegistro=true;  
    }
  }
  
  vwRecetario(){
    this.panelLogin=false;
    this.panelRegistro=false;
    this.panelHome=false;
    this.panelRecetario=true;
  }

}
