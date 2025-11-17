import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { UsuarioAtividade } from '../models/usuario-atividade.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAtividadeService {

  constructor(private dbService: DbService) { }

  getAllUsuarioAtividade(): Promise<UsuarioAtividade[]> {
    return this.dbService.usuarioAtividade.toArray();
  }

  async getAssociacoesByAtividadeId(atividadeId: number): Promise<UsuarioAtividade[]> {
    return await this.dbService.usuarioAtividade.where('atividadeId').equals(atividadeId).toArray();
  }
  async getAssociacoesById(atividadeId: number, usuarioId: number): Promise<UsuarioAtividade[]> {
    return await this.dbService.usuarioAtividade.where({
      atividadeId: atividadeId, usuarioId:
        usuarioId
    }).toArray();
  }
  async deleteAtividadeUsuarioAssociacao(atividadeId: number, usuarioId: number): Promise<void> {
    return await this.dbService.usuarioAtividade.delete([atividadeId, usuarioId]);
  }
  async addMultiplosUsuarioAtividadeAssociacoes(associations: UsuarioAtividade[]): Promise<[number,
    number][]> {
    return await this.dbService.usuarioAtividade.bulkPut(associations) as unknown as
      Promise<[number, number][]>;
  }

  async getAssociacoesByUsuarioId(usuarioId: number): Promise<UsuarioAtividade[]> { 
    return await this.dbService.usuarioAtividade.where('usuarioId').equals(usuarioId).toArray(); 
  }
}