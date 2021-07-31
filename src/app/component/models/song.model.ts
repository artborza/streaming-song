import { Playlist } from "./playlist.model";

export interface Song {
    id?:any;
    title?:string;
    cover?:string;
    preview?:string;
    playlist:Playlist;
    isPlay:boolean;
    isLike:boolean;
}
