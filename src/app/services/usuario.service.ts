import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private dbService: DbService) {}
  
  addUsuario(usuario: Usuario) {
    return this.dbService.usuarios.add(usuario);
  }

  getAllUsuarios(): Promise<Usuario[]> {
    return this.dbService.usuarios.toArray();
  }
}
