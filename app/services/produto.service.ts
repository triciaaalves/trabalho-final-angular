import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private dbService: DbService) { }

  addProduto(produto: Produto) {
    return this.dbService.produtos.add(produto);
  }

  updateProduto(produto: Produto) {
    return this.dbService.produtos.put(produto);
  }

  deleteProduto(id: number) {
    return this.dbService.produtos.delete(id);
  }

  getAllProdutos(): Promise<Produto[]> {
    return this.dbService.produtos.toArray();
  }

  getProdutoById(id: number) {
    return this.dbService.produtos.get(id);
  }

  getProdutosByFornecedorId(fornecedorId: number): Promise<Produto[]> {
    return this.dbService.produtos.where('fornecedorId')
      .equals(fornecedorId).toArray();
  }
}
