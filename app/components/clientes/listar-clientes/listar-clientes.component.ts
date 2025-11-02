import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
    selector: 'app-listar-clientes',
    imports: [CommonModule],
    templateUrl: './listar-clientes.component.html',
    styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent implements OnInit {
    clientes: Cliente[] = [];
    imagemModalUrl: string = '';

    constructor(private clienteService: ClienteService, private router: Router) { }

    ngOnInit(): void {
        this.getAllClientes();
    }

    getAllClientes() {
        this.clienteService.getAllClientes().then(clientes => {
            this.clientes = clientes;
        });
    }

    addCliente() {
        this.router.navigate(['/clientes/cadastro-cliente']);
    }

    editCliente(id: number) {
        this.router.navigate(['/clientes/editar-cliente', id]);
    }

    deleteCliente(id: number) {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Esta ação não pode ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.clienteService.deleteCliente(id).then(() => {
                    this.getAllClientes();
                });
                Swal.fire('Excluído!', 'O cliente foi excluído com sucesso.', 'success');
            }
        });
    }

    abrirModalImagem(cliente: Cliente): void {
        if (cliente.fotoUrl) {
            this.imagemModalUrl = cliente.fotoUrl;
        }
        Swal.fire({
            imageUrl: this.imagemModalUrl
        });
    }
}
