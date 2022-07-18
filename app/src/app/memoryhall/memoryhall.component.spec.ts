import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryhallComponent } from './memoryhall.component';

describe('MemoryhallComponent', () => {
  let component: MemoryhallComponent;
  let fixture: ComponentFixture<MemoryhallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryhallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryhallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
