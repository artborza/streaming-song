import { Component, OnInit } from '@angular/core';
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { Playlist } from '../models/playlist.model';
import { Song } from '../models/song.model';

@Component({
  selector: 'app-menu3',
  templateUrl: './menu3.component.html',
  styleUrls: ['./menu3.component.css']
})
export class Menu3Component implements OnInit {
  playLists: Playlist[] =[];
  song:Song[] =[] ;
  songNo:any;
  constructor(private menuServiceService:MenuServiceService) { }

  ngOnInit(): void {
    this.getAllSongtThatYouLike()
  }
  select(row:any){
    for (let index = 0; index < this.song.length; index++) {
      if(this.song[index].id==row){
        this.menuServiceService.changeMessage({url:String( this.song[index].preview),cover:String( this.song[index].cover),title:String( this.song[index].title)})
        
      }
    }
  }
  getAllSongtThatYouLike():Song[]{
    this.menuServiceService.getLikeSong()
      .subscribe(
        data => {
          this.song = data
          this.songNo = this.song.length
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
