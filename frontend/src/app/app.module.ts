import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { PrefaceComponent } from './page/preface/preface.component';
import { ContactComponent } from './page/contact/contact.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UsersComponent } from './page/users/users.component';
import { UsersEditorComponent } from './page/users-editor/users-editor.component';
import { PlacesComponent } from './page/places/places.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './service/jwt.interceptor';
import { AuthService } from './service/auth.service';
import { ConfigService, IMenuItem } from './service/config.service';
import { FilterPipe } from './pipe/filter.pipe';
import { DataTableModule } from './common/data-table/data-table.module';
import { AllPlaceViewerComponent } from './page/all-place-viewer/all-place-viewer.component';
import { AllPlaceEditorComponent } from './page/all-place-editor/all-place-editor.component';
import { SorterPipe } from './pipe/sorter.pipe';
import { MapComponent } from './page/map/map.component';
import { PlayerComponent } from './page/battle/player/player.component';
import { BattleComponent } from './page/battle/battle.component';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    PrefaceComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    UsersEditorComponent,
    PlacesComponent,
    NavbarComponent,
    SidebarComponent,
    AllPlaceViewerComponent,
    AllPlaceEditorComponent,
    MapComponent,
    PlayerComponent,
    BattleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
  ],
  exports: [FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  sidebar: IMenuItem[] = this.config.sidebarMenu;
  constructor(private config: ConfigService) {}
}
