import { RouteModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from 'login/login.component'


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AppRoutingModule.forRoot({
        { path: '/api/login', component: LoginComponent}
    })
  ],
  exports: [
      RouteModule,
  ],
  providers: [],
})
export class AppModule { }