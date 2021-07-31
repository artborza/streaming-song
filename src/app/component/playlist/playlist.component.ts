import { ViewChild } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { Playlist } from '../models/playlist.model';
import { Song } from '../models/song.model';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  
  playlist!: Playlist;
  playLists: Playlist[] =[];
  song!: Song[];
  selectedProduct1!: Song;
  selectedRowIndex:any;
  image!:string
  name!:string
  
  constructor(private menuServiceService: MenuServiceService,
    private route: ActivatedRoute,
    private router: Router) { }
    message!: {url:string,cover:string,title:string};
    aSong!:{url:string,title:string,cover:string}

    @ViewChild(PlayerComponent)
    playerY!: PlayerComponent;
  ngOnInit(): void {
    this.menuServiceService.currentMessage.subscribe(message => this.message = message)
    if(this.route.snapshot.paramMap.get('songId')){
      this.getSongsInPlaylistBtSongId(this.route.snapshot.paramMap.get('songId'));
      this.onInit(this.route.snapshot.paramMap.get('songId'))
    }
    if(this.route.snapshot.paramMap.get('aSong')){
      console.log(1);
      this.getASongBySongId(this.route.snapshot.paramMap.get('aSong'))
      this.onInit(this.route.snapshot.paramMap.get('aSong'))
    }
    if(this.route.snapshot.paramMap.get('playlistId')){
      this.getSongsInPlaylistBtPlaylistId(this.route.snapshot.paramMap.get('playlistId'))
      this.onInit(this.route.snapshot.paramMap.get('playlistId'))
    }else{
      this.getAllSongtThatYouLike()
      this.playlist.name = "เพลงที่ถูกใจ"
    }
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
  getASongBySongId(id:any): void {
    this.menuServiceService.getPlaylistBySongId(id)
      .subscribe(
        data => {
          this.song = data;
          this.playlist = data[0].playlist
          for (let index = 0; index < this.song.length; index++) {
            if(id==this.song[index].id){
              this.song[index].isPlay = true
              this.song= [this.song[index]]
            }
          }
        },
        error => {
          console.log(error);
        })
  }
  getAllSongtThatYouLike():Song[]{
    this.menuServiceService.getLikeSong()
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
  getSongsInPlaylistBtSongId(id:any): void {
    this.menuServiceService.getPlaylistBySongId(id)
      .subscribe(
        data => {
          this.song = data;
          this.playlist = data[0].playlist
          for (let index = 0; index < this.song.length; index++) {
            if(id==this.song[index].id){
              this.song[index].isPlay = true
              this.menuServiceService.changeMessage({url:String( this.song[index].preview),cover:String( this.song[index].cover),title:String( this.song[index].title)}) 
            }
          }
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
          for (let index = 0; index < this.song.length; index++) {
            if(id==this.song[index].id){
              this.song[index].isPlay = true
              this.menuServiceService.changeMessage({url:String( this.song[index].preview),cover:String( this.song[index].cover),title:String( this.song[index].title)}) 
            }
          }
        },
        error => {
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

