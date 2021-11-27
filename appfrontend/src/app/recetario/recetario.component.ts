import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-recetario',
  templateUrl: './recetario.component.html',
  styleUrls: ['./recetario.component.css']
})
export class RecetarioComponent implements OnInit {
  apiURL: string = 'http://localhost:8080/api/';
  name = 'Angular';
  recetas: Array<any> = [];
  recetasFilter: Array<any> = [];
  textobuscar: string = '';
  panelNueva=false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getRecetas();
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

  buscarReceta(){
    this.getRecetario().subscribe(res => {  
      this.recetas = res.body;
      let recetasLike =  Object.values(this.recetas).filter(user => user.descripcion.includes(this.textobuscar));
      this.recetas = recetasLike;
    });    
  }

  nuevaReceta(){
    this.panelNueva=true;
  }

}
