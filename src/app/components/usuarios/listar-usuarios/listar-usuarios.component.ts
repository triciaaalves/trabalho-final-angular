import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  imports: [],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: Usuario[] = []

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  getAllUsuarios(){
    this.usuarioService.getAllUsuarios().then(usuarios => {
      this.usuarios = usuarios;
    });
  }
}