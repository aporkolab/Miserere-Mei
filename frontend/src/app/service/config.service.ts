// import { INgxTableColumn } from './../data-table/ngx-data-table/ngx-data-table.component';
import { Injectable } from '@angular/core';
import { INgxTableColumn } from '../common/data-table/ngx-data-table/ngx-data-table.component';

export interface IMenuItem {
  link: string;
  title: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  sidebarMenu: IMenuItem[] = [
    { link: '/', title: 'Dashboard', icon: 'home' },
    { link: '/movies', title: 'Planned Films', icon: 'calendar' },
    { link: '/watched-movies', title: 'Watched Films', icon: 'Youtube' },
    { link: '/directors', title: 'Directors', icon: 'video' },
    { link: '/main-actors', title: 'Main Actors', icon: 'film' },
    { link: '/family-members', title: 'Family Members', icon: 'users' },
  ];

  placesTableColumns: INgxTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'location', title: 'Location' },
    { key: 'narrationZoneText', title: 'Narration zone text' },
    { key: 'opponentName', title: "Opponent's name" },
    { key: 'decision1', title: '1st decision' },
    { key: 'decision2', title: '2nd decision' },
    { key: 'decision3', title: '3rd decision' },
    { key: 'decision4', title: '4th decision' },
    { key: 'furtherLocation1', title: '1st further location' },
    { key: 'furtherLocation2', title: '2nd further location' },
    { key: 'furtherLocation3', title: '3rd further location' },
    { key: 'furtherLocation4', title: '4th further location' },
    { key: 'objectFound', title: 'Object found' },
  ];

  usersTableColumn: INgxTableColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'firstName', title: 'First Name' },
    { key: 'lastName', title: 'Last Name' },
    { key: 'email', title: 'E-mail' },
    { key: 'role', title: 'Role' },
  ];
  constructor() {}
}
