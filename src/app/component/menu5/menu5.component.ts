import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { Playlist } from '../models/playlist.model';
import { Song } from '../models/song.model';

@Component({
  selector: 'app-menu5',
  templateUrl: './menu5.component.html',
  styleUrls: ['./menu5.component.css']
})
export class Menu5Component implements OnInit {
  playlist!: Playlist;
  playLists: Playlist[] =[];
  song!: Song[];
  selectedProduct1!: Song;
  selectedRowIndex:any;
  namePlaylist:any
  constructor(private menuServiceService: MenuServiceService,
    private route: ActivatedRoute,
    private router: Router) { }
    songNo:any;
  ngOnInit(): void {
      this.namePlaylist ="เพลงที่ถูกใจ"
      this.getAllSongtThatYouLike()

  }
  onInit(id:any):void{
     for (let index = 0; index < this.song.length; index++) {
      if(this.song[index].isLike==null){
        this.song[index].isLike == false
      }
      if(this.song[index].id==id){
        this.song[index].isPlay = true
      }else{
        this.song[index].isPlay= false
      }
      
    }
  }
  getAllSongtThatYouLike():Song[]{
    console.log("มานะ")
    this.menuServiceService.getLikeSong2()
      .subscribe(
        data => {
          this.song = data
          var newArray = [];
          this.songNo = this.song.length
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
  getSongsInPlaylistBtSongId(id:any): void {
    this.menuServiceService.getPlaylistBySongId(id)
      .subscribe(
        data => {
          this.song = data;
          this.playlist = data[0].playlist
          console.log(data);
        },
        error => {
          console.log(error);
        })
  }
  getSongsInPlaylistBtPlaylistId(id:any): void {
    this.menuServiceService.getPlaylistByPlaylistId(id)
      .subscribe(
        data => {
          this.song = data;
          this.playlist = data[0].playlist
          console.log(data);
        },
        error => {
          console.log(error);
        })
  }
  highlight(row:any){
    this.selectedRowIndex=row;
    for (let index = 0; index < this.song.length; index++) {
      if(index==row){
        this.song[index].isPlay = true
        this.menuServiceService.changeMessage({url:String( this.song[index].preview),cover:String( this.song[index].cover),title:String( this.song[index].title)})
      }else{
        this.song[index].isPlay= false
      }
      
    }
  }

  like(row:any){
    this.selectedRowIndex=row;
    for (let index = 0; index < this.song.length; index++) {
      if(index==row){
        this.song[index].isLike = !this.song[index].isLike
        const data = {
          isLike: this.song[index].isLike
        };
        this.menuServiceService.update(this.song[index].id, data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
      }
      
    }
  }

}
