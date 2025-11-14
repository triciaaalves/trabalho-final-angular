import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Atividade } from '../../models/atividade.model';
import { AtividadeService } from '../../services/atividade.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, DragDropModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  aFazer: Atividade[] = [];
  emAndamento: Atividade[] = [];
  concluida: Atividade[] = [];

  constructor(private atividadeService: AtividadeService) { }

  async ngOnInit() {
    // 1. Buscar todas as atividades
    const atividades = await this.atividadeService.getAllAtividades();

    // 2. Separar nos arrays corretos
    atividades.forEach(atividade => {
      if (atividade.status === 'Em Andamento') {
        this.emAndamento.push(atividade);
      } else if (atividade.status === 'Concluída') {
        this.concluida.push(atividade);
      } else {
        // Se for 'A Fazer' ou um status inválido/nulo, vai para 'A Fazer'
        this.aFazer.push(atividade);
      }
    });
  }

  // 3. A função mágica do Drag-and-Drop!
  async drop(event: CdkDragDrop<Atividade[]>) {
    if (event.previousContainer === event.container) {
      // Movendo dentro da MESMA lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Movendo para uma lista DIFERENTE
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Atualizar o status do item que foi movido
      const atividadeMovida = event.container.data[event.currentIndex];
      const novoStatusContainerId = event.container.id; // 'aFazerList', 'emAndamentoList', 'concluidaList'

      // Mapear o ID do container de volta para o status da Atividade
      if (novoStatusContainerId === 'emAndamentoList') {
        atividadeMovida.status = 'Em Andamento';
      } else if (novoStatusContainerId === 'concluidaList') {
        atividadeMovida.status = 'Concluída';
      } else {
        atividadeMovida.status = 'A Fazer';
      }

      // Salvar a mudança no banco de dados
        await this.atividadeService.updateAtividade(atividadeMovida);
  
    }
  }

}
