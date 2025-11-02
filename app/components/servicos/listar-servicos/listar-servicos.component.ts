import { Component, OnInit } from '@angular/core';
import { Servico } from '../../../models/servico.model';
import { ServicoService } from '../../../services/servico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-servicos',
  imports: [],
  templateUrl: './listar-servicos.component.html',
  styleUrl: './listar-servicos.component.css'
})
export class ListarServicosComponent implements OnInit {
  servicos: Servico[] = [];

  constructor(private servicoService: ServicoService, private router: Router) { }

  ngOnInit() {
    this.getAllServicos();
  }

  getAllServicos() {
    this.servicoService.getAllServicos().then(servicos => {
      this.servicos = servicos;
    });
  }
  associarProdutos(servicoId: number) {
    this.router.navigate(['/servico/', servicoId, 'produtos']);
  }
}