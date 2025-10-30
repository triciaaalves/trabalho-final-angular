import { Injectable } from '@angular/core';
import { db, DbService } from './db.service';
import { Atividade } from '../models/atividade.model';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  constructor(private dbService: DbService) { }

  addAtividade(atividade: Atividade){
    return this.dbService.atividades.add(atividade);
  }

  getAllAtividades(): Promise<Atividade[]> {
    return this.dbService.atividades.toArray();
  }

  getAtividadeById(id: number){
    return db.atividades.get(id);
  }

  updateAtividade(atividade: Atividade){
    return db.atividades.put(atividade);
  }

  deleteAtividade(id: number){
    return db.atividades.delete(id);
  }

}
