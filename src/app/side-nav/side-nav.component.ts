import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuServiceService, MenuItem, Menu } from '../service/menu-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  menuGroupSelected: String;
  menuList: MenuItem[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private menuService: MenuServiceService) {
    this.menuList = this.menuService.getMenuList();
    this.menuGroupSelected = "";
  }
  selectMenu(menuGroup: Menu) {
    if (this.menuGroupSelected === menuGroup.code) {
      this.menuGroupSelected = "";
      return;
    }
    this.menuGroupSelected = menuGroup.code;
  }

}
