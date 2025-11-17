import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtividadeService } from '../../../services/atividade.service';
import { Atividade } from '../../../models/atividade.model';

@Component({
  selector: 'app-listar-atividades-usuario',
  imports: [],
  templateUrl: './listar-atividades-usuario.component.html',
  styleUrl: './listar-atividades-usuario.component.css'
})
export class ListarAtividadesUsuarioComponent implements OnInit {
  atividades: Atividade[] = [];
  usuarioId!: number;
  nomeUsuario!: string;
  usuarioService: any;

  constructor(private route: ActivatedRoute, private atividadeService: AtividadeService) { }

  ngOnInit() {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    this.getAtividadesByUsuarioId(this.usuarioId);
  }

  async getAtividadesByUsuarioId(usuarioId: number) {
    this.atividades = await this.atividadeService.getAtividadesByUsuarioId(usuarioId);
  }

  async getNomeUsuarioById(usuarioId: number) {
    const usuario = await this.usuarioService.getUsuarioById(usuarioId);
    this.nomeUsuario = usuario.nome;
  }

}
