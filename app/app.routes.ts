import { Routes } from '@angular/router';
import { CadastroClienteComponent } from './components/clientes/cadastro-cliente/cadastro-cliente.component';
import { ListarClientesComponent } from './components/clientes/listar-clientes/listar-clientes.component';
import { CadastroFornecedorComponent } from './components/fornecedores/cadastro-fornecedor/cadastro-fornecedor.component';
import { ListarFornecedorComponent } from './components/fornecedores/listar-fornecedor/listar-fornecedor.component';
import { ListarProdutosFornecedorComponent } from './components/fornecedores/listar-produtos-fornecedor/listar-produtos-fornecedor.component';
import { CadastroFuncionarioComponent } from './components/funcionarios/cadastro-funcionario/cadastro-funcionario.component';
import { ListarFuncionariosComponent } from './components/funcionarios/listar-funcionarios/listar-funcionarios.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroProdutoComponent } from './components/produtos/cadastro-produto/cadastro-produto.component';
import { ListarProdutosComponent } from './components/produtos/listar-produtos/listar-produtos.component';
import { CadastroServicoComponent } from './components/servicos/cadastro-servico/cadastro-servico.component';
import { ListarServicosComponent } from './components/servicos/listar-servicos/listar-servicos.component';
import { AssociacaoProdutosServicoComponent } from './components/servicos/associacao-produtos-servico/associacao-produtos-servico.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fornecedores/cadastro-fornecedor', component: CadastroFornecedorComponent },
  { path: 'fornecedores/listar-fornecedores', component: ListarFornecedorComponent },
  { path: 'fornecedores/editar-fornecedor/:id', component: CadastroFornecedorComponent },
  { path: 'produtos/cadastro-produto', component: CadastroProdutoComponent },
  { path: 'produtos/listar-produtos', component: ListarProdutosComponent },
  { path: 'produtos/editar-produto/:id', component: CadastroProdutoComponent },
  { path: 'fornecedor/:id/produtos', component: ListarProdutosFornecedorComponent },
  { path: 'servicos/cadastro-servico', component: CadastroServicoComponent },
  { path: 'servicos/listar-servicos', component: ListarServicosComponent },
  { path: 'servico/:id/produtos', component: AssociacaoProdutosServicoComponent },
  { path: 'clientes/cadastro-cliente', component: CadastroClienteComponent },
  { path: 'clientes/listar-clientes', component: ListarClientesComponent },
  { path: 'clientes/editar-cliente/:id', component: CadastroClienteComponent },
  { path: 'funcionarios/cadastro-funcionario', component: CadastroFuncionarioComponent },
  { path: 'funcionarios/listar-funcionarios', component: ListarFuncionariosComponent },
  { path: 'funcionarios/editar-funcionario/:id', component: CadastroFuncionarioComponent },
];




















// { path: 'variaveis', component: VariaveisComponent },
// { path: 'primo', component: NumeroPrimoComponent },
// { path: 'tabuada', component: TabuadaComponent },
// { path: 'maior', component: MaiorNumeroArrayComponent },
// { path: 'idades', component: ClassificacaoIdadeComponent },
// { path: 'notas', component: ConversaoNotaComponent },
// { path: 'conversao', component: ConversaoDolarComponent },
// { path: 'tempo', component: TempoVelocidadeComponent },
// { path: 'maior-3', component: MaiorDeTresComponent },
// { path: 'soma', component: SomaMediaComponent },
// { path: 'primo-form', component: NumeroPrimoFormComponent },