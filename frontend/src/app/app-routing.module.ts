import { ContactComponent } from './page/contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPlaceEditorComponent } from './page/all-place-editor/all-place-editor.component';
import { AllPlaceViewerComponent } from './page/all-place-viewer/all-place-viewer.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { PlacesComponent } from './page/places/places.component';
import { PrefaceComponent } from './page/preface/preface.component';
import { UsersEditorComponent } from './page/users-editor/users-editor.component';
import { UsersComponent } from './page/users/users.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';
import { MapComponent } from './page/map/map.component';
import { PlayerService } from './service/player.service';
import { PlayerComponent } from './page/battle/player/player.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'users/select/:id',
    component: UsersEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'allplace',
    component: AllPlaceViewerComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'allplace/select/:id',
    component: AllPlaceEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    },
  },
  {
    path: 'place/:location',
    component: PlacesComponent,
  },
  {
    path: 'player/:id',
    component: PlayerComponent,
  },
  {
    path: 'preface',
    component: PrefaceComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
