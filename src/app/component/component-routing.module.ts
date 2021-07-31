import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu1Component as menu1 } from './menu1/menu1.component';
import { Menu2Component as menu2 } from './menu2/menu2.component';
import { Menu3Component as menu3 } from './menu3/menu3.component';
import { Menu4Component as menu4 } from './menu4/menu4.component';
import { Menu5Component as menu5 } from './menu5/menu5.component';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
  {path:'',component:menu1},
  {path:'menu2',component:menu2},
  {path:'menu3',component:menu3},
  {path:'menu4',component:menu4},
  {path:'menu5',component:menu5},
  {path:'playlist/likeSong',component:PlaylistComponent},
  {path:'playlist/:playlistid',component:PlaylistComponent},
  {path:'playlist2/:songId',component:PlaylistComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
