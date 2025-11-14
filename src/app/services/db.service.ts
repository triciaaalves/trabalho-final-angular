import { Injectable } from '@angular/core';
import { Dexie, Table } from 'dexie';
import { Usuario } from '../models/usuario.model';
import { Atividade } from '../models/atividade.model';
import { UsuarioAtividade } from '../models/usuario-atividade.model';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie{
  usuarios!: Table<Usuario, number>;
  atividades!: Table<Atividade, number>;
  usuarioAtividade!: Table<UsuarioAtividade, [number, number]>;

  constructor() {
    super('finalDB');
    this.version(1).stores({
      usuarios: '++id, nome, email',
      atividades: '++id, nome, descricao, prioridade',
      usuarioAtividade: '[atividadeId+usuarioId], atividadeId, usuarioId'
    });
   }
}
export const db = new DbService();