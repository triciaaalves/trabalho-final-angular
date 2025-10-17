import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  usuarios: Usuario[] = [];
  formUsuario = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl('')
  });
  constructor(private usuarioService: UsuarioService) { }

  addUsuario() {
    if (this.formUsuario.valid) {
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
