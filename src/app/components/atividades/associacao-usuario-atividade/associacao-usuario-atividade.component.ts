import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioAtividade } from '../../../models/usuario-atividade.model';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioAtividadeService } from '../../../services/usuario-atividade.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AtividadeService } from '../../../services/atividade.service';

@Component({
  selector: 'app-associacao-usuario-atividade',
  imports: [CommonModule, DragDropModule],
  templateUrl: './associacao-usuario-atividade.component.html',
  styleUrl: './associacao-usuario-atividade.component.css'
})
export class AssociacaoUsuarioAtividadeComponent implements OnInit {
  usuarios: Usuario[] = [];
  atividadeId!: number;
  usuariosOriginal: Usuario[] = [];
  usuariosSelecionadosIds: Set<number> = new Set<number>();
  usuariosSelecionados: Usuario[] = [];
  usuarioIdSelecionado!: number;

  constructor(private atividadeService: AtividadeService, private usuarioService: UsuarioService, private usuarioAtividadeService: UsuarioAtividadeService, private route: ActivatedRoute) { }
  async ngOnInit() {
    this.atividadeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.atividadeId) {
      const atividade = await this.atividadeService.getAtividadeById(this.atividadeId);
    }
    this.usuarioService.getAllUsuarios().then((usuarios) => {
      this.usuarios = usuarios;
      this.usuariosOriginal = usuarios;
    });
    this.loadAllUsuariosAssociacoesIndexedDb();
  }

  async loadAllUsuariosAssociacoesIndexedDb(): Promise<void> {
    try {
      const associations: any[] = await
        this.usuarioAtividadeService.getAssociacoesByAtividadeId(this.atividadeId);
      this.usuariosSelecionadosIds = new Set(associations.map((assoc) => assoc.usuarioId));
      const usuariosPromises = Array.from(this.usuariosSelecionadosIds).map(idprod =>
        this.usuarioService.getUsuarioById(idprod)
      );
      const usuariosEncontrados = await Promise.all(usuariosPromises);
      for (const usuario of usuariosEncontrados) {
        if (usuario) {
          const indexParaRemover = this.usuariosOriginal.findIndex(p => p.id === usuario.id);
          if (indexParaRemover > -1) {
            const usuarioMovido = this.usuariosOriginal.splice(indexParaRemover, 1)[0];
            this.usuariosSelecionados.push(usuarioMovido);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar usuários associados:', error);
    }
  }

  dropped(event: CdkDragDrop<Usuario[]>) {
    if (event.previousContainer === event.container) {
      // Movendo dentro da mesma lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Movendo entre listas diferentes
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex,
        event.currentIndex);
      const usuario = event.container.data[event.currentIndex];
      if (usuario.id !== undefined) {
        console.log(this.usuariosSelecionadosIds);

        if (this.usuariosSelecionadosIds.has(usuario.id)) {
          this.usuariosSelecionadosIds.delete(usuario.id);
          this.usuarioIdSelecionado = usuario.id;
          if (usuario.id !== undefined) {
            this.usuarioAtividadeService.deleteAtividadeUsuarioAssociacao(this.atividadeId, usuario.id);
          }
        } else {
          this.usuarioIdSelecionado = usuario.id;
          this.confirmAdicaoUsuarioAtividade();
        }
      }
    }
  }

  confirmAdicaoUsuarioAtividade(): void {
    this.usuariosSelecionadosIds.add(this.usuarioIdSelecionado);
    const novaAssociacaoUsuarioAtividade: UsuarioAtividade = {
      atividadeId: this.atividadeId,
      usuarioId: this.usuarioIdSelecionado,
    };
    this.usuarioAtividadeService.addMultiplosUsuarioAtividadeAssociacoes([novaAssociacaoUsuarioAtividade]);
  }
}


