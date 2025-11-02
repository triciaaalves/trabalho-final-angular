import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
    selector: 'app-cadastro-cliente',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './cadastro-cliente.component.html',
    styleUrl: './cadastro-cliente.component.css'
})
export class CadastroClienteComponent implements OnInit {
    clienteId!: number;
    fotoPreviewUrl: string | ArrayBuffer | null = null;

    private fb = inject(FormBuilder);
    formCliente = this.fb.group({
        nome: ['', Validators.required],
        fone: ['', Validators.required],
        email: ['', Validators.required],
        fotoUrl: [''],
        endereco: ['', Validators.required]
    });

    constructor(private clienteService: ClienteService, private router: Router,
        private route: ActivatedRoute, private toastService: ToastService) { }

    async ngOnInit() {
        this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.clienteId) {
            const cliente = await this.clienteService.getClienteById(this.clienteId);
            if (cliente) {
                if (cliente.fotoUrl) {
                    this.fotoPreviewUrl = cliente.fotoUrl;
                }
                this.formCliente.patchValue({
                    nome: cliente.nome,
                    fone: cliente.fone,
                    email: cliente.email,
                    fotoUrl: cliente.fotoUrl,
                    endereco: cliente.endereco,
                });
            };
        }
    }

    addCliente() {
        if (this.formCliente.valid) {
            if (!this.clienteId) {
                const novoCliente: Cliente = {
                    nome: this.formCliente.value.nome!,
                    fone: this.formCliente.value.fone!,
                    email: this.formCliente.value.email!,
                    fotoUrl: this.formCliente.value.fotoUrl!,
                    endereco: this.formCliente.value.endereco!,
                };

                this.clienteService.addCliente(novoCliente).then(() => {
                    Swal.fire('Cadastro realizado!', 'O cliente foi cadastrado com sucesso.', 'success');
                    this.router.navigate(['clientes/listar-clientes']);
                });
            } else {
                this.editCliente();
            }
        }
    }

    editCliente() {
        if (this.formCliente.valid) {
            const clienteEditado: Cliente = {
                id: this.clienteId,
                nome: this.formCliente.value.nome!,
                fone: this.formCliente.value.fone!,
                email: this.formCliente.value.email!,
                fotoUrl: this.formCliente.value.fotoUrl!,
                endereco: this.formCliente.value.endereco!,
            };
            this.clienteService.updateCliente(clienteEditado).then(() => {
                Swal.fire('Cadastro atualizado!', 'O cliente foi atualizado com sucesso.', 'success');
                this.router.navigate(['clientes/listar-clientes']);
            });
        }
    }

    onFileSelected(event: Event): void {
        const element = event.target as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            if (file.type.match(/image\/*/) == null) {
                this.toastService.showError("Arquivo inválido!",
                    "Somente arquivos de imagem são permitidos.", 8000);
                this.formCliente.get('fotoUrl')?.setValue('');
                this.fotoPreviewUrl = null;
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.fotoPreviewUrl = reader.result;
                this.formCliente.get('fotoUrl')?.setValue(reader.result as string);
            };
            reader.onerror = (error) => {
                this.toastService.showError("Erro", "Erro ao ler o arquivo!");
                this.formCliente.get('fotoUrl')?.setValue('');
                this.fotoPreviewUrl = null;
            };
        } else {
            this.formCliente.get('fotoUrl')?.setValue('');
            this.fotoPreviewUrl = null;
        }
    }
}
