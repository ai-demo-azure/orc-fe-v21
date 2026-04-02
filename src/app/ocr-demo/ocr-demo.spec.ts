import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrDemo } from './ocr-demo';

describe('OcrDemo', () => {
  let component: OcrDemo;
  let fixture: ComponentFixture<OcrDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(OcrDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
