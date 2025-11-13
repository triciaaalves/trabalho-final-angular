import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Atividade } from '../../../models/atividade.model';
import { AtividadeService } from '../../../services/atividade.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-atividade',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-atividade.component.html',
  styleUrl: './cadastro-atividade.component.css'
})
export class CadastroAtividadeComponent implements OnInit {
  atividades: Atividade[] = [];
  formAtividade = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    prioridade: new FormControl('', [Validators.required]),
    data: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
  });
  
  categorias: string[] = ['Estudo', 'Trabalho', 'Lazer'];
  prioridades: string[] = ['Baixa', 'Média', 'Alta', 'Urgente'];
  atividadeId!: number;
  private atividadeOriginal: Atividade | undefined;

  constructor(private atividadeService: AtividadeService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.atividadeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.atividadeId) {
      const atividade = await this.atividadeService.getAtividadeById(this.atividadeId);
      if (atividade) {
        this.formAtividade = new FormGroup({
          
          nome: new FormControl(atividade.nome),
          descricao: new FormControl(atividade.descricao),
          prioridade: new FormControl(atividade.prioridade),
          categoria: new FormControl(atividade.categoria),
          data: new FormControl(atividade.data)
        });
      };
    }
  }

  editAtividade() {
    const atividadeEditada: Atividade = {
      id: this.atividadeId,
      nome: this.formAtividade.value.nome!,
      descricao: this.formAtividade.value.descricao!,
      prioridade: this.formAtividade.value.prioridade!,
      data: this.formAtividade.value.data!,
      categoria: this.formAtividade.value.categoria!,
      status: this.atividadeOriginal!.status
    };
    this.atividadeService.updateAtividade(atividadeEditada).then(() => {
      Swal.fire('Atualizada!', 'A atividade foi atualizada com sucesso.', 'success');
      this.router.navigate(['atividades/listar-atividades']);
    });
  }

  addAtividade() {
    if (this.formAtividade.valid) {
      if (this.atividadeId) {
        this.editAtividade();
      } else {
        const novoAtividade: Atividade = {
          nome: this.formAtividade.value.nome!,
          descricao: this.formAtividade.value.descricao!,
          prioridade: this.formAtividade.value.prioridade!,
          data: this.formAtividade.value.data!,
          categoria: this.formAtividade.value.categoria!,
          status: 'A Fazer'
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
}
