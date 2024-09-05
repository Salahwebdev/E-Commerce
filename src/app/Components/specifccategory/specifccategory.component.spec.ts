import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifccategoryComponent } from './specifccategory.component';

describe('SpecifccategoryComponent', () => {
  let component: SpecifccategoryComponent;
  let fixture: ComponentFixture<SpecifccategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecifccategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecifccategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
