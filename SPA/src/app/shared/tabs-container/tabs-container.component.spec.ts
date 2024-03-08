import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsContainerComponent } from './tabs-container.component';
import { Component } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { By } from '@angular/platform-browser';

@Component ({
  template:
  `<app-tabs-container>
  <app-tab TabTitle = "tab1"> hello Tab 1 </app-tab>
  <app-tab TabTitle = "tab2"> hello tab 2 </app-tab>
  </app-tabs-container>`
}) class TestHostComponenent
{

}

describe('TabsContainerComponent', () => {
  let component: TestHostComponenent;
  let fixture: ComponentFixture<TestHostComponenent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponenent, TabsContainerComponent, TabComponent]
    });
    fixture = TestBed.createComponent(TestHostComponenent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two tabs',  () => {
    let tabs = fixture.debugElement.queryAll(By.css('li'))
    let containerComponent = fixture.debugElement.query(
      By.directive(TabsContainerComponent))
    const tabsProp = containerComponent.componentInstance.tabs
    expect(tabs.length).withContext('tabs did not render').toBe(2)
    expect(tabsProp.length).withContext('could not grab component property').toBe(2)
  } )
});
