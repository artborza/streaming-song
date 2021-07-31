import { EventEmitter, ViewChild } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { PlaylistComponent } from '../playlist/playlist.component';

@Component({
  selector: 'app-player',
  template: `
    <app-playlist (messageEvent)="receiveMessage($event)"></app-playlist>
  `,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  message!:{url:string,cover:string,title:string};
  constructor(private menuServiceService: MenuServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

   audioList = [
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      title: "begin",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    }
  ];
  
  ngOnInit(): void {
    console.log(this.audioList)
    this.menuServiceService.currentMessage.subscribe(message => this.message = message)
    this.menuServiceService.getEventSubject().subscribe((param: {url:string,cover:string,title:string}) => {
      if (param !== undefined &&param.cover !=="" && param.cover !== "" && param.title != "") {
        console.log(param)
        this.click(param);
      }
      });
    
  }

  receiveMessage($event:any){
    console.log($event+"123")
  }

  click(param:any){
    console.log(param)
    this.audioList.push(param)
    console.log(this.audioList)

  }

}
