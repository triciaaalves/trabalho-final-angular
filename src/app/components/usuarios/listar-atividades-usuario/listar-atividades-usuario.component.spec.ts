import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtividadesUsuarioComponent } from './listar-atividades-usuario.component';

describe('ListarAtividadesUsuarioComponent', () => {
  let component: ListarAtividadesUsuarioComponent;
  let fixture: ComponentFixture<ListarAtividadesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAtividadesUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAtividadesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
