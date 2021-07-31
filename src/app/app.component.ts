import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { PlaylistComponent } from './component/playlist/playlist.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'streaming-song';
  @ViewChild(PlaylistComponent) playlistComponent!: PlaylistComponent;
  ngOnInit(): void {
  
  }
 

}

