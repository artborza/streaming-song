import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu1Component as menu1 } from './menu1/menu1.component';
import { Menu2Component as menu2 } from './menu2/menu2.component';
import { Menu3Component as menu3 } from './menu3/menu3.component';
import { Menu4Component as menu4 } from './menu4/menu4.component';
import { Menu5Component as menu5 } from './menu5/menu5.component';
import { ComponentRoutingModule } from './component-routing.module';
import { PlayerComponent } from './player/player.component';
import { AngMusicPlayerModule } from  'ang-music-player';
import { PlaylistComponent } from './playlist/playlist.component';


@NgModule({
  declarations: [
    menu1,
    menu2,
    menu3,
    menu4,
    menu5,
    PlayerComponent,
    AngMusicPlayerModule,
    PlaylistComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule
  ]
})
export class ComponentModule { }
