import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  apiURL: string = 'http://localhost:8080/api/nuevareceta';
  recetas: Array<any> = [];
  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  preparacion: string = '';
  ingredientes: string = '';
  notas: string = '';
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  registrarReceta(){
    const recetadata = {nombre: this.nombre, descripcion: this.descripcion, imagen: this.imagen, preparacion: this.preparacion, ingredientes: this.ingredientes, notas: this.notas};
    this.httpClient.post<any>(`${this.apiURL}`, recetadata).subscribe( res => {
        this.getRecetas();
    });

  }

  public getRecetario(url?: string){   
    return this.httpClient.get<any>(`${this.apiURL}`+'misrecetas',
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

}
