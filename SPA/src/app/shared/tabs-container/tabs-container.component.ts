import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit {
@ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList()
ngAfterContentInit(): void {
  const activetabs = this.tabs?.filter(
    x=> x.Active
  )
  if(!activetabs || activetabs.length == 0)
  {
    this.SelectTab(this.tabs?.first)
  }
}
SelectTab(tab: TabComponent)
{
  this.tabs?.forEach(tab => {
    tab.Active = false
  })
  tab.Active = true
  return false
}
}
