import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoUsuarioAtividadeComponent } from './associacao-usuario-atividade.component';

describe('AssociacaoUsuarioAtividadeComponent', () => {
  let component: AssociacaoUsuarioAtividadeComponent;
  let fixture: ComponentFixture<AssociacaoUsuarioAtividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociacaoUsuarioAtividadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociacaoUsuarioAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
