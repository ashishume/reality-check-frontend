import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakingDialogComponent } from './speaking-dialog.component';

describe('SpeakingDialogComponent', () => {
  let component: SpeakingDialogComponent;
  let fixture: ComponentFixture<SpeakingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
