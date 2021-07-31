import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { Playlist } from '../models/playlist.model';
import { Song } from '../models/song.model';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.component.html',
  styleUrls: ['./menu1.component.css']
})
export class Menu1Component implements OnInit {
  playLists: Playlist[] =[];
  song:Song[] =[] ;
  id="";
  public now: Date = new Date();
  public welcome : String = new String();
  responsiveOptions:any;

  constructor(private menuServiceService:MenuServiceService,private router:Router) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
   }

  ngOnInit(): void {
    this.getAllSong();
    this.welcomeTime();
  }

  welcomeTime(): void{
    if(this.now.getHours() >= 6){
      this.welcome = "อรุณสวัสดิ์";
    }
    if(this.now.getHours() >= 12){
      this.welcome = "สวัสดีตอนเที่ยง";
    }
    if(this.now.getHours() >= 13){
      this.welcome = "สวัสดียามบ่าย";
    }
    if(this.now.getHours() >= 18){
      this.welcome = "สวัสดีตอนเย็น";
    }
  }
  onLoadPlaylist(id:any): void {
    this.router.navigate(['/playlist2',id,]);
  }
  // getAllPlayList(): void{
  //   this.menuServiceService.getAllPlayList()
  //     .subscribe(
  //       data => {
  //         this.playLists = data;
  //         console.log("data:"+data);
  //       },
  //       error =>{
  //         console.log("error:"+error);
  //       });
  // }
  getAllSong():Song[]{
    this.menuServiceService.getAllSong()
      .subscribe(
        data => {
          this.song = data
          var newArray = [];
          for(var i in this.song) {
            newArray[this.song[i]["playlist"]["id"]] = this.song[i].playlist
          }
          for (let index = 0; index < newArray.length; index++) {
            if(newArray[index]!=null)this.playLists.push(newArray[index])
          }
          for(var i in this.playLists) {
            var newArraySong = [];
            for(var j in this.song){
              if(this.song[j]["playlist"]["id"]==this.playLists[i]["id"]){
                newArraySong.push(this.song[j])
              }
            }
            this.playLists[i]["song"] = newArraySong
          }
        },
        error =>{
          console.log("error:"+error);
        });
        return  this.song
  }
  
}

