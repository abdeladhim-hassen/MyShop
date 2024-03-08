import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';
import { By } from '@angular/platform-browser';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabComponent]
    }).compileComponents;
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hidden class', () => {
    const el = fixture.debugElement.query(By.css('.hidden'))
    expect(el).toBeTruthy();
  });

  it('should not have hidden class', () => {
    component.Active = true
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css('.hidden'))
    expect(el).toBeFalsy();
  });
});
