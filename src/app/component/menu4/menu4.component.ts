import { Component, OnInit } from '@angular/core';
import { Playlist } from '../models/playlist.model';
import { Song } from '../models/song.model';
import { MenuServiceService } from 'src/app/service/menu-service.service';

@Component({
  selector: 'app-menu4',
  templateUrl: './menu4.component.html',
  styleUrls: ['./menu4.component.css']
})
export class Menu4Component implements OnInit {
  playLists: Playlist[] =[];
  song:Song[] =[] ;
  constructor(private menuServiceService:MenuServiceService) { }

  ngOnInit(): void {
    this.getAllSong();
  }

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
