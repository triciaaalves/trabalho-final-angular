import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Funcionario } from '../../../models/funcionario.model';
import { FuncionarioService } from '../../../services/funcionario.service';

@Component({
    selector: 'app-listar-funcionarios',
    imports: [CommonModule],
    templateUrl: './listar-funcionarios.component.html',
    styleUrl: './listar-funcionarios.component.css'
})
export class ListarFuncionariosComponent implements OnInit {
    funcionarios: Funcionario[] = [];
    imagemModalUrl: string = '';
    funcionarioEmail!: string | undefined;
    funcionarioFone!: string | undefined;

    constructor(private funcionarioService: FuncionarioService, private router: Router) { }

    ngOnInit(): void {
        this.getAllFuncionarios();
    }

    verDetalhesFuncionario(funcionario: Funcionario): void {
        this.abrirModalImagem(funcionario);
    }

    getAllFuncionarios() {
        this.funcionarioService.getAllFuncionarios().then(funcionarios => {
            this.funcionarios = funcionarios;
        });
    }

    addFuncionario() {
        this.router.navigate(['/funcionarios/cadastro-funcionario']);
    }

    editFuncionario(id: number) {
        this.router.navigate(['/funcionarios/editar-funcionario', id]);
    }

    deleteFuncionario(id: number) {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Esta ação não pode ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.funcionarioService.deleteFuncionario(id).then(() => {
                    this.getAllFuncionarios();
                });
                Swal.fire('Excluído!', 'O funcionario foi excluído com sucesso.', 'success');
            }
        });
    }

    abrirModalImagem(funcionario: Funcionario): void {
        if (funcionario.fotoUrl) {
            this.imagemModalUrl = funcionario.fotoUrl;
            this.funcionarioEmail = `${funcionario.email}`;
            this.funcionarioFone = `${funcionario.fone}`;
        }

        Swal.fire({
            title: funcionario.nome,
            imageUrl: this.imagemModalUrl
        });

    }
}
