import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Atividade } from '../../../models/atividade.model';
import { AtividadeService } from '../../../services/atividade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-atividade',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-atividade.component.html',
  styleUrl: './cadastro-atividade.component.css'
})
export class CadastroAtividadeComponent {
  atividades: Atividade[] = [];
  formAtividade = new FormGroup({
    nome: new FormControl(''),
    descricao: new FormControl(''),
    prioridade: new FormControl('')
  });

  constructor(private atividadeService: AtividadeService) { }

  addAtividade() {
    if (this.formAtividade.valid) {
      const novoAtividade: Atividade = {
        nome: this.formAtividade.value.nome!,
        descricao: this.formAtividade.value.descricao!,
        prioridade: this.formAtividade.value.prioridade!
      };
      this.atividadeService.addAtividade(novoAtividade).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'A atividade foi cadastrada com sucesso.',
          timer: 5000,
          showConfirmButton: true,
          draggable: true
          });
        this.formAtividade.reset();
      });
    }
  }
}
