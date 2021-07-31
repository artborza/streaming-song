import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Playlist } from '../component/models/playlist.model';
import { Song } from '../component/models/song.model';

const baseUrl = 'http://localhost:8080/app/';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  private messageSource = new BehaviorSubject({url:"",cover:"",title:""});
  currentMessage = this.messageSource.asObservable();
  constructor(private http: HttpClient) { }

  // getAllPlayList():Observable<Playlist[]>{
  //   return this.http.get<Playlist[]>(baseUrl);
  // }
  changeMessage(message:{url:string,cover:string,title:string}) {
    this.messageSource.next(message)
    console.log(message)
  }
  getEventSubject(): BehaviorSubject<{url:string,cover:string,title:string}> {
    return this.messageSource;
 }
  getAllSong():Observable<Song[]>{
    return this.http.get<Song[]>(`${baseUrl}/menu1`);
  }
  getAllSongNotDuplicate():Observable<Song[]>{
    return this.http.get<Song[]>(`${baseUrl}/menu2`);
  }
  getLikeSong():Observable<Song[]>{
    return this.http.get<Song[]>(`${baseUrl}/menu3`);
  }
  getLikeSong2():Observable<Song[]>{
    return this.http.get<Song[]>(`${baseUrl}/menu5`);
  }
  getPlaylistBySongId(id:any): Observable<Song[]> {
    return this.http.get<Song[]>(`${baseUrl}/playlist2/${id}`);
  }
  getPlaylistByPlaylistId(id:any): Observable<Song[]> {
    return this.http.get<Song[]>(`${baseUrl}/playlist/${id}`);
  }
  update(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/songUpdate/${id}`, data);
  }

  getMenuList() {
    const menuList: MenuItem[] = [
      {
        group: { code: 'menu1', name: 'หน้าหลัก',icon: 'home' },
        menus: []
      },
      {
        group: { code: 'menu2', name: 'ค้นหา',icon: 'search' },
        menus: []
      },
      {
        group: { code: 'menu3', name: 'คอลเลกชันของคุณ',icon: 'collections' },
        menus: []
      },
      {
        group: { code: 'menu5', name: 'เพลงที่ถูกใจ',icon: 'favorite_border' },
        menus: []
      }
    ];
    return menuList;
  }

    
  getSubMenuName(menuCode: string) {
    const menuList = this.getMenuList();
    for (const group of menuList) {
      for (const menu of group.menus) {
        return ` > ${menu.name}`;
      }
    }
    return '';
  }


}

export interface MenuItem {
  group: Menu;
  menus: Menu[];
}

export interface Menu {
  code: string;
  name: string;
  icon: string;
}
