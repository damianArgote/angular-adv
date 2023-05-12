import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  public usuario!: Usuario;
  public nombre: string = '';
  menuItems: any[] = [];
  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = this.sidebarService.menu;
    this.usuario = this.usuarioService.usuario;
  }
}
