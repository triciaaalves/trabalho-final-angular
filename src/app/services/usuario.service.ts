import { Injectable } from '@angular/core';
import { db, DbService } from './db.service';
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

  getUsuarioById(id: number) {
    return db.usuarios.get(id);
  }

  updateUsuario(usuario: Usuario) {
    return db.usuarios.put(usuario);
  }

  deleteUsuario(id: number) {
    return db.usuarios.delete(id);
  }
}
