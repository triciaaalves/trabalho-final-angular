import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  formUsuario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  usuarioId!: number;

  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.usuarioId) {
      const usuario = await this.usuarioService.getUsuarioById(this.usuarioId);
      if (usuario) {
        this.formUsuario = new FormGroup({
          nome: new FormControl(usuario.nome),
          email: new FormControl(usuario.email)
        });
      };
    }
  }

  addUsuario() {
    if (this.formUsuario.valid) {
      if (this.usuarioId) {
        this.editUsuario();
      } else {
        const novoUsuario: Usuario = {
          nome: this.formUsuario.value.nome!,
          email: this.formUsuario.value.email!
        };
        this.usuarioService.addUsuario(novoUsuario).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado!',
            text: 'O usuário foi cadastrado com sucesso.',
            timer: 5000,
            showConfirmButton: true,
            draggable: true
          });
          this.formUsuario.reset();
        });
      }
    }
  }

  editUsuario() {
    const usuarioEditado: Usuario = {
      id: this.usuarioId,
      nome: this.formUsuario.value.nome!,
      email: this.formUsuario.value.email!
    };
    this.usuarioService.updateUsuario(usuarioEditado).then(() => {
      Swal.fire('Atualizado!', 'O usuário foi atualizado com sucesso.', 'success');
      this.router.navigate(['usuarios/listar-usuarios']);
    });
  }
}
