import { Song } from "./song.model";

export interface Playlist {
    id?:any;
    name?:string;
    image?:string;
    nameEnglish?:string;
    nameThai?:string;
    isLike:boolean;
    song:Song[];
}
