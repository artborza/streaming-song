import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Menu1Component } from './component/menu1/menu1.component';
import { Menu2Component } from './component/menu2/menu2.component';
import { Menu3Component } from './component/menu3/menu3.component';
import { Menu4Component } from './component/menu4/menu4.component';
import { Menu5Component } from './component/menu5/menu5.component';
import { PlayerComponent } from './component/player/player.component';
import { PlaylistComponent } from './component/playlist/playlist.component';
import { AngMusicPlayerModule } from  'ang-music-player';
import {HttpClientModule} from '@angular/common/http';

import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { DividerModule } from "primeng/divider";
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {PickListModule} from 'primeng/picklist';
import {CardModule} from 'primeng/card';
import { MenuServiceService } from './service/menu-service.service';

import { NgxAudioPlayerModule } from 'ngx-audio-player';
@NgModule({
declarations: [
AppComponent,
SideNavComponent,
Menu1Component,
Menu2Component,
Menu3Component,
Menu4Component,
Menu5Component,
PlayerComponent,
PlaylistComponent

],
imports: [
BrowserModule,
DataViewModule,
PanelModule,
DropdownModule,
DialogModule,
InputTextModule,
RatingModule,
RippleModule,
BrowserAnimationsModule,
AppRoutingModule,
LayoutModule,
MatToolbarModule,
MatButtonModule,
MatSidenavModule,
MatIconModule,
MatListModule,
CarouselModule,
CardModule,
ButtonModule,
ToastModule,
AngMusicPlayerModule,
DividerModule,
TableModule,
PickListModule,
HttpClientModule,
NgxAudioPlayerModule
],
providers: [MenuServiceService],
exports:[PlayerComponent],
bootstrap: [AppComponent]
})
export class AppModule { }