import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard!!!',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Main',
          url: '/',
        },
        {
          titulo: 'ProgressBar',
          url: 'progress',
        },
        {
          titulo: 'Graficas',
          url: 'grafica1',
        },
        {
          titulo: 'Promesa',
          url: 'promesa',
        },
        {
          titulo: 'Observables',
          url: 'observables',
        },
      ],
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          titulo: 'Usuarios',
          url: 'usuarios',
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales',
        },
        {
          titulo: 'Mendicos',
          url: 'medicos',
        },
      ],
    },
  ];

  constructor() {}
}
