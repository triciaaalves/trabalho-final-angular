import { Component, OnInit } from '@angular/core';
import { Atividade } from '../../../models/atividade.model';
import { AtividadeService } from '../../../services/atividade.service';

@Component({
  selector: 'app-listar-atividades',
  imports: [],
  templateUrl: './listar-atividades.component.html',
  styleUrl: './listar-atividades.component.css'
})
export class ListarAtividadesComponent implements OnInit{
  atividades: Atividade[] = []
  
  constructor(private atividadeService: AtividadeService){}

  ngOnInit(): void {
    this.getAllAtividades();
  }

  getAllAtividades() {
    this.atividadeService.getAllAtividades().then(atividades => {
      this.atividades = atividades;
    });
  }
}
