import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtividadeService } from '../../../services/atividade.service';
import { Atividade } from '../../../models/atividade.model';
import { CommonModule } from '@angular/common';
import { UsuarioAtividadeService } from '../../../services/usuario-atividade.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listar-atividades-usuario',
  imports: [CommonModule],
  templateUrl: './listar-atividades-usuario.component.html',
  styleUrl: './listar-atividades-usuario.component.css'
})
export class ListarAtividadesUsuarioComponent implements OnInit {
  atividades: Atividade[] = [];
  usuarioId!: number;
  nomeUsuario!: string;

  constructor(private route: ActivatedRoute, private atividadeService: AtividadeService, private usuarioAtividadeService: UsuarioAtividadeService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    this.getAtividadesByUsuarioId(this.usuarioId);
    this.getNomeUsuarioById(this.usuarioId)
  }

  async getAtividadesByUsuarioId(usuarioId: number) {
    try {
      // 1. Buscar as associações (ex: [{atividadeId: 1}, {atividadeId: 3}])
      const associacoes = await this.usuarioAtividadeService.getAssociacoesByUsuarioId(usuarioId);

      // 2. Extrair os IDs (ex: [1, 3])
      const atividadeIds = associacoes.map(assoc => assoc.atividadeId);

      // 3. Buscar os dados completos de cada atividade
      // Usamos Promise.all para fazer várias buscas em paralelo
      const atividadesPromises = atividadeIds.map(id =>
        this.atividadeService.getAtividadeById(id)
      );

      const atividadesEncontradas = await Promise.all(atividadesPromises);

      // Filtra qualquer resultado 'undefined' (caso uma atividade tenha sido deletada)
      this.atividades = atividadesEncontradas.filter(a => a !== undefined) as Atividade[];

    } catch (error) {
      console.error("Erro ao buscar atividades do usuário:", error);
      this.atividades = [];
    }
  }

  async getNomeUsuarioById(usuarioId: number) {
    const usuario = await this.usuarioService.getUsuarioById(usuarioId);
    if (usuario) {
      this.nomeUsuario = usuario.nome;
    }
  }

}
