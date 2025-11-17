import { Component, OnInit } from '@angular/core';
import { Atividade } from '../../../models/atividade.model';
import { AtividadeService } from '../../../services/atividade.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-atividades',
  imports: [],
  templateUrl: './listar-atividades.component.html',
  styleUrl: './listar-atividades.component.css'
})
export class ListarAtividadesComponent implements OnInit {
  atividades: Atividade[] = []

  constructor(private atividadeService: AtividadeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllAtividades();
  }

  getAllAtividades() {
    this.atividadeService.getAllAtividades().then(atividades => {
      this.atividades = atividades;
    });
  }

  editAtividade(id: number) {
    this.router.navigate(['/atividades/editar-atividade', id]);
  }

  deleteAtividade(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.atividadeService.deleteAtividade(id).then(() => {
          this.getAllAtividades();
        });
        Swal.fire('Excluído!', 'A atividade foi excluída com sucesso', 'success');
      }
    });
  }

  associarUsuarios(atividadeId: number) {
    this.router.navigate(['/atividade/', atividadeId, 'usuarios']);
  }

}
