import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { Playlist } from '../models/playlist.model';
import { Song } from '../models/song.model';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.css']
})
export class Menu2Component implements OnInit {

  playLists: Playlist[] =[];
  song:Song[] =[] ;
  sortOrder!: number;
  sortField!: string;
  toggleSearch: boolean = false;
  constructor(private menuServiceService:MenuServiceService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.getAllSong();
  }
  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
select(row:any){
  for (let index = 0; index < this.song.length; index++) {
    if(this.song[index].id==row){
      this.menuServiceService.changeMessage({url:String( this.song[index].preview),cover:String( this.song[index].cover),title:String( this.song[index].title)})
      
    }
  }
}
  getAllSong():Song[]{
    this.menuServiceService.getAllSongNotDuplicate()
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
