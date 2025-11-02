import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FornecedorService } from '../../../services/fornecedor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-fornecedor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrl: './cadastro-fornecedor.component.css'
})
export class CadastroFornecedorComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  formFornecedor = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    fone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
  });
  fornecedorId!: number;

  constructor(private fornecedorService: FornecedorService, 
    private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.fornecedorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.fornecedorId) {
      const fornecedor = await
        this.fornecedorService.getFornecedorById(this.fornecedorId);
      if (fornecedor) {
        this.formFornecedor = new FormGroup({
          nome: new FormControl(fornecedor.nome),
          cnpj: new FormControl(fornecedor.cnpj),
          fone: new FormControl(fornecedor.fone)
        });
      };
    }
  }

  addFornecedor() {
    if (this.formFornecedor.valid) {
      if (this.fornecedorId) {
        this.editFornecedor();
      } else {
        const novoFornecedor: Fornecedor = {
          nome: this.formFornecedor.value.nome!,
          cnpj: this.formFornecedor.value.cnpj!,
          fone: this.formFornecedor.value.fone!,
        }
        this.fornecedorService.addFornecedor(novoFornecedor).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado!',
            text: 'O fornecedor foi cadastrado com sucesso.',
            timer: 5000,
            showConfirmButton: true,
            draggable: true
          });
          this.formFornecedor.reset();
        });
      }
    }
  }

  editFornecedor() {
    const fornecedorEditado: Fornecedor = {
      id: this.fornecedorId,
      nome: this.formFornecedor.value.nome!,
      cnpj: this.formFornecedor.value.cnpj!,
      fone: this.formFornecedor.value.fone!
    };
    this.fornecedorService.updateFornecedor(fornecedorEditado).then(() => {
      Swal.fire('Atualizado!', 'O fornecedor foi atualizado com sucesso.',
        'success');
      this.router.navigate(['fornecedores/listar-fornecedores']);
    });
  }
}
