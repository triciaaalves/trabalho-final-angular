import { Injectable } from '@angular/core';
import { DbService } from './db.service';
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

}
