import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransactionDialogComponent } from './delete-transaction-dialog.component';

describe('DeleteTransactionDialogComponent', () => {
  let component: DeleteTransactionDialogComponent;
  let fixture: ComponentFixture<DeleteTransactionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTransactionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
