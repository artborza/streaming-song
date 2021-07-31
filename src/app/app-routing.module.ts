import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu1Component } from './component/menu1/menu1.component';
import { Menu2Component } from './component/menu2/menu2.component';
import { Menu3Component } from './component/menu3/menu3.component';
import { Menu4Component } from './component/menu4/menu4.component';
import { Menu5Component } from './component/menu5/menu5.component';
import { PlaylistComponent } from './component/playlist/playlist.component';
import { SideNavComponent } from './side-nav/side-nav.component';

const routes: Routes = [
  { path:'',component:Menu1Component},
  { path:'app/menu2',component:Menu2Component},
  { path:'app/menu3',component:Menu3Component},
  { path:'app/menu4',component:Menu4Component},
  { path:'app/menu5',component:Menu5Component},
  { path:'app/playlist/likeSong',component:PlaylistComponent},
  { path:'app/playlist/:playlistId',component:PlaylistComponent},
  { path:'app/song/:aSong',component:PlaylistComponent},
  { path:'app/playlist2/:songId',component:PlaylistComponent},
  {path:'**',redirectTo:''}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
