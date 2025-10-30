import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CadastroUsuarioComponent } from './components/usuarios/cadastro-usuario/cadastro-usuario.component';
import { ListarUsuariosComponent } from './components/usuarios/listar-usuarios/listar-usuarios.component';
import { CadastroAtividadeComponent } from './components/atividades/cadastro-atividade/cadastro-atividade.component';
import { ListarAtividadesComponent } from './components/atividades/listar-atividades/listar-atividades.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'usuarios/cadastro-usuario', component: CadastroUsuarioComponent },
    { path: 'usuarios/listar-usuarios', component: ListarUsuariosComponent },
    { path: 'atividades/cadastro-atividade', component: CadastroAtividadeComponent},
    { path: 'atividades/listar-atividades', component: ListarAtividadesComponent},
    { path: 'atividades/editar-atividade/:id', component: CadastroAtividadeComponent},
];
