import { inject, Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Fornecedor } from '../models/fornecedor.model';
import { PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  constructor(private dbService: DbService) { }

  addFornecedor(fornecedor: Fornecedor): PromiseExtended<number> {
    return this.dbService.fornecedores.add(fornecedor);
  }

  getAllFornecedores(): Promise<Fornecedor[]> {
    return this.dbService.fornecedores.toArray();
  }

  getFornecedorById(id: number) {
    return this.dbService.fornecedores.get(id);
  }
  updateFornecedor(fornecedor: Fornecedor) {
    return this.dbService.fornecedores.put(fornecedor);
  }
  deleteFornecedor(id: number) {
    return this.dbService.fornecedores.delete(id);
  }
  
}
