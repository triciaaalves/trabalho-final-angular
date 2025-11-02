import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Funcionario } from '../../../models/funcionario.model';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ToastService } from '../../../shared/services/toast.service';


@Component({
    selector: 'app-cadastro-funcionario',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './cadastro-funcionario.component.html',
    styleUrl: './cadastro-funcionario.component.css'
})
export class CadastroFuncionarioComponent {
    funcionarioId!: number;
    fotoPreviewUrl: string | ArrayBuffer | null = null;

    private fb = inject(FormBuilder);
    formFuncionario = this.fb.group({
        nome: ['', Validators.required],
        fone: ['', Validators.required],
        email: ['', Validators.required],
        fotoUrl: [''],
        funcao: ['', Validators.required],
        dataAdmissao: ['', Validators.required]
    });

    constructor(private funcionarioService: FuncionarioService, private router: Router,
        private route: ActivatedRoute, private toastService: ToastService) { }

    async ngOnInit() {
        this.funcionarioId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.funcionarioId) {
            const funcionario = await this.funcionarioService.getFuncionarioById(this.funcionarioId);
            if (funcionario) {
                let formattedDate;
                if (funcionario.dataAdmissao) {
                    formattedDate = funcionario.dataAdmissao.toISOString().substring(0, 10);
                } else {
                    formattedDate = "";
                }

                this.formFuncionario.patchValue({
                    nome: funcionario.nome,
                    fone: funcionario.fone,
                    email: funcionario.email,
                    fotoUrl: funcionario.fotoUrl,
                    funcao: funcionario.funcao,
                    dataAdmissao: formattedDate
                });
            };
        }
    }

    addFuncionario() {
        if (this.formFuncionario.valid) {
            if (!this.funcionarioId) {
                const dataAdmissaoDate = new Date(this.formFuncionario.value.dataAdmissao!);
                const novoFuncionario: Funcionario = {
                    nome: this.formFuncionario.value.nome!,
                    fone: this.formFuncionario.value.fone!,
                    email: this.formFuncionario.value.email!,
                    fotoUrl: this.formFuncionario.value.fotoUrl!, // verificar porque é opcional
                    funcao: this.formFuncionario.value.funcao!,
                    dataAdmissao: dataAdmissaoDate,
                };

                this.funcionarioService.addFuncionario(novoFuncionario).then(() => {
                    Swal.fire('Cadastro realizado!', 'O funcionario foi cadastrado com sucesso.', 'success');
                    this.router.navigate(['funcionarios/listar-funcionarios']);
                });
            } else {
                this.editFuncionario();
            }
        }
    }

    editFuncionario() {
        if (this.formFuncionario.valid) {
            const dataAdmissaoDate = new Date(this.formFuncionario.value.dataAdmissao!);
            const funcionarioEditado: Funcionario = {
                id: this.funcionarioId,
                nome: this.formFuncionario.value.nome!,
                fone: this.formFuncionario.value.fone!,
                email: this.formFuncionario.value.email!,
                fotoUrl: this.formFuncionario.value.fotoUrl!, // verificar porque é opcional
                funcao: this.formFuncionario.value.funcao!,
                dataAdmissao: dataAdmissaoDate,
            };
            this.funcionarioService.updateFuncionario(funcionarioEditado).then(() => {
                Swal.fire('Cadastro atualizado!', 'O funcionario foi atualizado com sucesso.', 'success');
                this.router.navigate(['funcionarios/listar-funcionarios']);
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
                this.formFuncionario.get('fotoUrl')?.setValue('');
                this.fotoPreviewUrl = null;
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.fotoPreviewUrl = reader.result;
                this.formFuncionario.get('fotoUrl')?.setValue(reader.result as string);
            };
            reader.onerror = (error) => {
                this.toastService.showError("Erro", "Erro ao ler o arquivo!");
                this.formFuncionario.get('fotoUrl')?.setValue('');
                this.fotoPreviewUrl = null;
            };
        } else {
            this.formFuncionario.get('fotoUrl')?.setValue('');
            this.fotoPreviewUrl = null;
        }
    }
}
