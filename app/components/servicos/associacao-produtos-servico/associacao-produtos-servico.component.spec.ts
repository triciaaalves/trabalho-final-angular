import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoProdutosServicoComponent } from './associacao-produtos-servico.component';

describe('AssociacaoProdutosServicoComponent', () => {
  let component: AssociacaoProdutosServicoComponent;
  let fixture: ComponentFixture<AssociacaoProdutosServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociacaoProdutosServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociacaoProdutosServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
